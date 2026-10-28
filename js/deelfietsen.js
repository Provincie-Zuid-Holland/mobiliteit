// Lagen oranje deelfietsen en suggesties: schematisch, zoals de oude kaart (plek + cirkel van 3 km),
// uit site/data/deelfietsen.json (tools/deelfietsen.py). Niet gekoppeld aan de echte Donkey-data.
// URL: deelfiets=1, suggesties=1; de oude links p=oranje (deelfietsen) en p=os (beide) werken ook.

const deelfietsLaag = (lijst, kleur) => laad('data/deelfietsen.json').then(data => L.layerGroup([
  // eerst alle cirkels, dan de stippen erboven
  ...data[lijst].map(([lat, lon]) => L.circle([lat, lon], {
    radius: 3000, color: kleur, weight: 1, opacity: 0.6, fillColor: kleur, fillOpacity: 0.05, interactive: false })),
  ...data[lijst].map(([lat, lon, naam]) => L.circleMarker([lat, lon], {
    pane: 'haltes', radius: 5, color: kleur, fillColor: kleur, fillOpacity: 0.8, bubblingMouseEvents: false })
    .bindTooltip(naam, { className: 'naam', direction: 'top' })
    .bindPopup(`<h3>${esc(naam)}</h3>`, { maxWidth: 260 })),
]));

LAGEN.push({
  id: 'deelfiets', naam: 'Oranje deelfietsen', standaard: false,
  oudeLink: () => ['oranje', 'os'].includes(url.get('p')),
  legenda: [{ kleur: 'orange', naam: 'plek met deelfietsen, cirkel = 3 km' }],
  maak: () => deelfietsLaag('hubs', 'orange'),
}, {
  id: 'suggesties', naam: 'Suggesties deelfietsplekken', standaard: false,
  oudeLink: () => url.get('p') === 'os',
  legenda: [{ kleur: 'purple', naam: 'voorgestelde plek, cirkel = 3 km' }],
  maak: () => deelfietsLaag('suggesties', 'purple'),
});
