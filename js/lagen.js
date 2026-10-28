// Aan/uit-lagen die op elke kaart kunnen. Per laag: id (ook URL-parameter: ?ov=0 zet uit, ?ov=1 aan),
// naam, standaard aan/uit, legenda en een functie die de Leaflet-laag maakt.

const OV_SOORTEN = {
  trein:    { naam: 'Trein',      kleur: '#847062', dikte: 4 },  // PZH Warm Grijs
  metro:    { naam: 'Metro',      kleur: '#c6a410', dikte: 3 },  // PZH Donkergeel
  bus:      { naam: 'R-net / bus', kleur: '#b24a00', dikte: 2 }, // PZH Donkeroranje
  waterbus: { naam: 'Waterbus',   kleur: '#7badde', dikte: 2 },  // PZH Lichtblauw
};

const LAGEN = [
  {
    id: 'ov', naam: 'OV-lijnen', standaard: true,
    legenda: Object.values(OV_SOORTEN).map(s => ({ naam: s.naam, kleur: s.kleur, lijn: true })),
    maak: () => laad('data/ov-lijnen.geojson').then(g => L.geoJSON(g, {
      pane: 'lijnen',
      style: f => {
        const s = OV_SOORTEN[f.properties.soort] || OV_SOORTEN.trein;
        return { color: s.kleur, weight: s.dikte, opacity: 0.8 };
      },
      onEachFeature: (f, l) => l.bindTooltip(f.properties.naam, { sticky: true, className: 'naam' }),
    })),
  },
];

// Zet de lagen in het paneel en op de kaart
function lagenPaneel(kaart) {
  kaart.createPane('lijnen').style.zIndex = 450;
  kaart.createPane('haltes').style.zIndex = 460;  // stippen boven de lijnen
  const lijst = document.getElementById('lagen');
  for (const laag of LAGEN) {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" value="${laag.id}"> ${esc(laag.naam)}</label>
      <ul class="legenda klein">${legendaHtml(laag.legenda || [])}</ul>`;
    lijst.append(li);
    const vink = li.querySelector('input');
    let leaflet;  // pas laden als de laag voor het eerst aangaat

    const zet = async aan => {
      vink.checked = aan;
      li.classList.toggle('aan', aan);
      if (aan) {
        try {
          leaflet ??= await laag.maak();
        } catch (fout) {
          console.error(fout);
          return meld(`${laag.naam} kon niet geladen worden.`);
        }
        if (vink.checked) leaflet.addTo(kaart);
      } else if (leaflet) {
        kaart.removeLayer(leaflet);
      }
    };
    vink.addEventListener('change', () => {
      zetUrl(laag.id, vink.checked === laag.standaard ? null : (vink.checked ? '1' : '0'));
      zet(vink.checked);
    });

    const p = url.get(laag.id);
    zet(p === null ? (laag.oudeLink?.() || laag.standaard) : p !== '0');
  }
}

function legendaHtml(items) {
  return items.map(i => `<li>${i.kleur ? `<i class="${i.lijn ? 'lijn' : ''}" style="background:${esc(i.kleur)}"></i>` : ''}${
    i.site ? `<a href="${esc(i.site)}" target="_blank" rel="noopener">${esc(i.naam)}</a>` : esc(i.naam)}</li>`).join('');
}
