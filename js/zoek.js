// Zoeken op adres of postcode via de PDOK Locatieserver (open, geen sleutel). Kies een uitkomst:
// de kaart gaat erheen en toont de info van die plek (tegel of gemeente) met de focus erin.

const LOCATIESERVER = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/free';
const zoekVeld = document.getElementById('zoek-tekst'), uitkomst = document.getElementById('zoek-uitkomst');
let zoekStip;

document.getElementById('zoek').addEventListener('submit', async e => {
  e.preventDefault();
  const q = zoekVeld.value.trim();
  uitkomst.innerHTML = '';
  if (!q) return;
  const vraag = new URLSearchParams({ q, rows: 6, fl: 'weergavenaam,centroide_ll' });
  vraag.append('fq', 'provincienaam:Zuid-Holland');
  vraag.append('fq', 'type:(adres OR postcode OR woonplaats OR weg)');
  let docs;
  try {
    docs = (await laad(`${LOCATIESERVER}?${vraag}`)).response.docs;
  } catch (fout) {
    return meld('Zoeken lukt nu niet.');
  }
  if (!docs.length) return meld(`Niets gevonden voor ${q} in Zuid-Holland.`);
  if (docs.length === 1) return ga(docs[0]);
  for (const d of docs) {
    const li = document.createElement('li'), knop = document.createElement('button');
    knop.type = 'button';
    knop.textContent = d.weergavenaam;
    knop.addEventListener('click', () => ga(d));
    li.append(knop);
    uitkomst.append(li);
  }
  meld(`${docs.length} plekken gevonden, kies er een in de lijst.`);
  uitkomst.querySelector('button').focus();
});

function ga(d) {
  const [lon, lat] = d.centroide_ll.match(/[\d.]+/g).map(Number);
  const plek = L.latLng(lat, lon);
  uitkomst.innerHTML = '';
  zoekStip?.remove();
  zoekStip = L.circleMarker(plek, { radius: 7, color: '#d11f3d', weight: 3, fill: false, interactive: false }).addTo(kaart);
  kaart.setView(plek, Math.max(kaart.getZoom(), 14), { animate: false });
  infoOp(plek, `<p class="adres">${esc(d.weergavenaam)}</p>`);
}
