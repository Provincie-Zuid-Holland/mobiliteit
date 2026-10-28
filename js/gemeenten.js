// Gemeentekaart: gemeenten met grenzen (klik voor info), ingekleurd per regio óf per OV-concessie.
// Staat geen van beide aan, dan zijn de gemeenten helemaal weg (geen grenzen, geen naam bij de muis).
// URL: regio=gem (standaard), regio=c, regio=0 (geen gemeenten).

const kaart = maakKaart();
paneelKnop();
lagenPaneel(kaart);
const metVakjes = vakjesPaneel(kaart);

const KLEUREN = { gem: "Gemeenten en regio's", c: 'Gemeenten en OV-concessies' };
const VULLING = 0.07;  // zoals de oude kaart: net zichtbaar, de achtergrond blijft leesbaar
// zonder regio-parameter: regio's aan, behalve bij een vakjeskaart (oude links als ?par=10)
let kleurOp = { gem: 'gem', c: 'c', 0: null }[url.get('regio')] ?? (metVakjes ? null : 'gem');
let indeling, laag, klikPunt, zetKleur, features = [];
const lagen = {};  // GM-code → Leaflet-laag

Promise.all([laad('data/gemeenten.geojson'), laad('data/indeling.json')]).then(([gemeenten, ind]) => {
  indeling = ind;
  indeling.regio = Object.fromEntries(ind.regios.map(r => [r.regio, r]));
  indeling.concessie = Object.fromEntries(ind.concessies.map(c => [c.concessie, c]));
  features = gemeenten.features;

  laag = L.geoJSON(gemeenten, {
    style: stijl,
    onEachFeature: (f, l) => {
      lagen[f.properties.code] = l;
      l.bindTooltip(f.properties.naam, { sticky: true, direction: 'top', className: 'naam' });
      // vóór bindPopup, zodat het klikpunt bekend is als de popup gevuld wordt
      l.on('click', e => { klikPunt = e.latlng; });
      l.bindPopup(() => popup(f.properties), { maxWidth: 260 });
      l.on({
        popupopen: () => { zetUrl('gem', f.properties.code); kiezer.value = f.properties.code; },
        popupclose: () => { zetUrl('gem', null); kiezer.value = ''; },
      });
    },
  });

  const kiezer = document.getElementById('gemeente');
  for (const f of gemeenten.features) kiezer.add(new Option(f.properties.naam, f.properties.code));
  kiezer.addEventListener('change', () => kiezer.value && toon(kiezer.value));

  kleurVinkjes();
  if (url.get('gem') && lagen[url.get('gem')]) toon(url.get('gem'));
}).catch(fout => {
  console.error(fout);
  document.getElementById('lagen').insertAdjacentHTML('afterbegin', '<li>Kaartdata kon niet geladen worden.</li>');
  meld('Kaartdata kon niet geladen worden.');
});

// Zonder gemeentelaag vangt de kaart zelf de klik op, voor de vakjes
kaart.on('click', e => {
  if (laag && kaart.hasLayer(laag)) return;
  const vak = vakInfo(e.latlng, gemeenteOp(e.latlng));
  if (vak) L.popup({ maxWidth: 260 }).setLatLng(e.latlng).setContent(vak).openOn(kaart);
});

// Toetsenbord: Enter op de kaart = info over het midden (daar staat het vizier, zie kaart.css)
kaart.getContainer().addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target === kaart.getContainer()) infoOp(kaart.getCenter());
});

// Info over een punt, met de focus in de popup: het vakje als de tegels aan staan, anders de gemeente.
// kop = extra regel bovenaan (bij zoeken: het adres); dan is er altijd een popup, desnoods alleen de tegellink.
function infoOp(latlng, kop = '') {
  const gem = gemeenteOp(latlng);
  let html = vakInfo(latlng, gem);
  if (!html && gem && laag && kaart.hasLayer(laag)) html = popup(gem);
  if (!html && !kop) return meld(gem ? `Gemeente ${gem.naam}. Zet een laag aan voor meer info.` : 'Hier zijn geen gegevens.');
  openInfo(kaart, latlng, kop + (html || `<p class="details"><a href="tegel.html?code=${vakCodeOp(latlng)}">Gegevens van de tegel op deze plek <span aria-hidden="true">→</span></a></p>`));
}

function stijl(f) {
  const regio = indeling.regio[f.properties.regio] || {};
  const groep = kleurOp === 'c' ? indeling.concessie[regio.concessie] || {} : regio;
  return { color: '#000', weight: 1, opacity: 0.2, fillColor: groep.kleur || '#fff', fillOpacity: VULLING };
}

function popup(p) {
  // staat er een vakjeskaart aan, dan eerst info over het aangeklikte vakje
  const vak = klikPunt && vakInfo(klikPunt, p);
  klikPunt = null;
  if (vak) return vak;
  const link = (href, tekst) => href ? `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(tekst)}</a>` : '';
  const slug = p.naam.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `<h3>${esc(p.naam)} <span class="regio">(${esc(p.regio)})</span></h3>
    <ul class="links">
      <li>${link(p.site, 'Website gemeente')}</li>
      <li>${link(`https://allecijfers.nl/verkiezingsuitslagen/gemeente-${slug}/`, 'Verkiezingsuitslag')}</li>
      <li>${link(`https://allecijfers.nl/gemeente/${slug}/`, 'Alle cijfers van gemeente')}</li>
    </ul>`;
}

// Regio's en concessies als twee vinkjes bovenaan de lagen: hooguit één tegelijk, geen mag ook
function kleurVinkjes() {
  const legenda = {
    gem: indeling.regios.map(r => ({ naam: r.regio, kleur: r.kleur, site: r.site })),
    c: indeling.concessies.map(c => ({ naam: c.concessie, kleur: c.kleur })),
  };
  const items = Object.entries(KLEUREN).map(([waarde, naam]) => {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" value="${waarde}"> ${naam}</label>
      <ul class="legenda klein vlak">${legendaHtml(legenda[waarde])}</ul>`;
    return li;
  });
  document.getElementById('lagen').prepend(...items);

  zetKleur = waarde => {
    kleurOp = waarde;
    for (const li of items) {
      const aan = li.querySelector('input').value === waarde;
      li.querySelector('input').checked = aan;
      li.classList.toggle('aan', aan);
    }
    zetUrl('regio', waarde === (metVakjes ? null : 'gem') ? null : (waarde || '0'));
    if (waarde) laag.setStyle(stijl).addTo(kaart); else kaart.removeLayer(laag);
  };
  for (const li of items) {
    const vink = li.querySelector('input');
    vink.addEventListener('change', () => zetKleur(vink.checked ? vink.value : null));
  }
  zetKleur(kleurOp);
}

function toon(code) {
  if (!kleurOp) zetKleur('gem');  // gemeente gekozen terwijl de gemeenten uit stonden
  const l = lagen[code];
  kaart.fitBounds(l.getBounds(), { maxZoom: 12, padding: [20, 20] });
  l.openPopup(l.getBounds().getCenter());
  meld(`${l.feature.properties.naam} staat op de kaart, met info.`);
}

// Gemeente onder een punt (ook als de gemeentelaag uit staat)
function gemeenteOp(latlng) {
  const { lng: x, lat: y } = latlng;
  const inRing = ring => {
    let binnen = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [x1, y1] = ring[i], [x2, y2] = ring[j];
      if ((y1 > y) !== (y2 > y) && x < x1 + (y - y1) * (x2 - x1) / (y2 - y1)) binnen = !binnen;
    }
    return binnen;
  };
  const f = features.find(f => {
    const g = f.geometry, polys = g.type === 'MultiPolygon' ? g.coordinates : [g.coordinates];
    return polys.some(p => inRing(p[0]) && !p.slice(1).some(inRing));
  });
  return f && f.properties;
}
