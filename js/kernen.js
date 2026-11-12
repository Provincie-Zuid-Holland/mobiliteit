// Lagen bevolkingskernen (CBS 2021), in twee groepen naar inwonertal, elk apart aan en uit te zetten;
// kleine kern = 250–10.000 inwoners, zoals in het onderzoek Vitaliteit en leefbaarheid van kernen in Zuid-Holland (2024).
// Kernen onder 250 inwoners (vooral randstukjes van grotere kernen) staan niet in het bestand.
// Data: site/data/kernen.geojson (tools/kernen_export.py), één keer geladen voor beide.
// URL: kernen=1 (kleine kernen), steden=1 (10.000 of meer).

const KERN_KLASSEN = [  // ondergrens inwoners, kleur, naam
  [250, '#f0a35e', '250 – 2.000 inwoners'],
  [2000, '#b24a00', '2.000 – 10.000 inwoners'],  // PZH Donkeroranje
  [10000, '#281f6b', '10.000 inwoners of meer'],  // PZH Blauw
];
const kernKlasse = n => KERN_KLASSEN.filter(([grens]) => n >= grens).pop();
const KERN_BRON = { naam: 'Bron: © CBS, Bevolkingskernen 2021' };
let kernenData;

const kernLaag = (van, tot) => (kernenData ??= laad('data/kernen.geojson')).then(g => L.geoJSON(g, {
  pane: 'kernen', bubblingMouseEvents: false,
  filter: f => f.properties.inwoners >= van && f.properties.inwoners < tot,
  style: f => {
    const kleur = kernKlasse(f.properties.inwoners)[1];
    return { color: kleur, weight: 1, opacity: 0.9, fillColor: kleur, fillOpacity: 0.45 };
  },
  onEachFeature: (f, l) => l.bindTooltip(f.properties.naam, { sticky: true, className: 'naam' })
    .bindPopup(() => kernPopup(f.properties), { maxWidth: 280 }),
}));
const kernLegenda = (...klassen) => [...klassen.map(i => ({ kleur: KERN_KLASSEN[i][1], naam: KERN_KLASSEN[i][2] })), KERN_BRON];

LAGEN.push({
  id: 'kernen', naam: 'Kleine kernen', standaard: false,
  legenda: kernLegenda(1, 0), maak: () => kernLaag(250, 10000),
}, {
  id: 'steden', naam: 'Steden en grote kernen', standaard: false,
  legenda: kernLegenda(2), maak: () => kernLaag(10000, Infinity),
});

function kernPopup(p) {
  const km = v => v == null ? '<span class="leeg">geen waarde</span>' : `${getal(v)} km`;
  const rij = (naam, v) => `<li>${naam}: ${v}</li>`;
  const groei = p.inwoners_2011 ? Math.round(100 * (p.inwoners - p.inwoners_2011) / p.inwoners_2011) : null;
  return `<h3>${esc(p.naam)}</h3>
    <p class="regio">Gemeente ${esc(p.gemeente)}${p.regio ? ` (${esc(p.regio)})` : ''}</p>
    <ul class="links">
      ${rij('Inwoners', `${getal(p.inwoners)} <span class="klein">(${p.inwoners < 10000 ? 'kleine kern' : esc(kernKlasse(p.inwoners)[2])})</span>`)}
      ${groei == null ? '' : rij('Sinds 2011', `${groei > 0 ? '+' : ''}${groei}%`)}
      ${p.ouderen == null ? '' : rij('65-plussers', `${p.ouderen}%`)}
    </ul>
    <p class="tussenkop">Dichtstbijzijnde</p>
    <ul class="links">
      ${rij('Supermarkt', km(p.supermarkt))}
      ${rij('Winkel dagelijkse boodschappen', km(p.dagelijks))}
      ${rij('Basisschool', km(p.basisschool))}
      ${rij('Huisarts', km(p.huisarts))}
      ${rij('Voortgezet onderwijs', km(p.vo))}
      ${rij('Treinstation', km(p.station))}
      ${rij('Oprit snelweg', km(p.oprit))}
      ${rij('Ziekenhuis', km(p.ziekenhuis))}
    </ul>
    <p class="bron">Bron: CBS, Bevolkingskernen 2021 (afstand over de weg, gemiddeld voor de inwoners)</p>`;
}
