// Laag OV-haltes (Studio Bereikbaar, ±2025, met toestemming): kleur = fiets-score, grootte = OV-score.
// Kleuren en klassen voorlopig overgenomen van de oude kaart; worden nog aangepast.
// URL: haltes=1 (oude links werken zo ook).

const HALTE_KLEUR = [  // fiets-score / 1000, ondergrens per klasse
  [0, '#ffffe5'], [1, '#fff7bc'], [5, '#fee391'], [10, '#fec44f'], [20, '#fe9929'],
  [30, '#ec7014'], [40, '#cc4c02'], [50, '#993404'], [60, '#662506'],
];
const HALTE_STRAAL = [[0, 2], [50, 3], [100, 5], [1000, 6]];  // OV-score / 1000 → straal in px
const halteKlasse = (tabel, v) => tabel.filter(([grens]) => v >= grens).pop()[1];

LAGEN.push({
  id: 'haltes', naam: 'OV-haltes', standaard: false,
  legenda: [
    ...HALTE_KLEUR.map(([grens, kleur], j) => ({ kleur,
      naam: j < HALTE_KLEUR.length - 1 ? `fiets-score ${grens} – ${HALTE_KLEUR[j + 1][0]}` : `fiets-score ≥ ${grens}` })).reverse(),
    { naam: 'grootte stip = OV-score' },
    { naam: 'Bron: Studio Bereikbaar (2025)' },
  ],
  maak: () => laad('data/haltes.json').then(({ velden, haltes }) => {
    const k = Object.fromEntries(velden.map((v, i) => [v, i]));
    return L.layerGroup(haltes.map(h => {
      const fiets = h[k.fiets_score] / 1000, ov = h[k.ov_score] / 1000;
      return L.circleMarker([h[k.lat], h[k.lon]], {
        pane: 'haltes', radius: halteKlasse(HALTE_STRAAL, ov), color: '#5a3a1a', weight: 0.6,
        fillColor: halteKlasse(HALTE_KLEUR, fiets), fillOpacity: 0.85, bubblingMouseEvents: false,
      }).bindTooltip(h[k.naam].replace('|', ' – '), { className: 'naam', direction: 'top' })
        .bindPopup(() => haltePopup(h, k), { maxWidth: 280 });
    }));
  }),
});

function haltePopup(h, k) {
  const rij = (naam, v) => `<li>${naam}: ${esc(v)}</li>`;
  const meer = ['fiets_rank_1_5km', 'fiets_rank_3km', 'nearby_fiets_rank1_1_5km', 'nearby_fiets_rank1_3km',
                'ov_rank_1_5km', 'ov_rank_3km', 'nearby_ov_rank1_1_5km', 'nearby_ov_rank1_3km', 'id_gtfs', 'cbs_vrk500', 'pc4']
    .map(v => rij(`<code>${v}</code>`, h[k[v]])).join('');
  return `<h3>${esc(h[k.naam].replace('|', ' – '))}</h3>
    <p class="regio">${esc(h[k.gemeente])} · ${esc(h[k.ov_niveau])}</p>
    <ul class="links">
      ${rij('Fiets-score', getal(Math.round(h[k.fiets_score] / 1000)))}
      ${rij('OV-score', getal(Math.round(h[k.ov_score] / 1000)))}
      ${rij('Rang binnen 1,5 km', h[k.rank_1_5km])}
      ${rij('Rang binnen 3 km', h[k.rank_3km])}
    </ul>
    <details><summary class="klein">meer…</summary><ul class="links klein">${meer}</ul></details>
    <p class="bron">Bron: Studio Bereikbaar (2025)</p>`;
}
