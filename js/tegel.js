// Tegelpagina: kaartje met de tegel omlijnd (zonder kleuring), rechts alle gegevens.
// Gegevens uit data/tegels/<x>_<y>.json (blokken van 5 × 5 km, zie tools/tegels_export.py).

const BLOK = 5000;
const code = (url.get('code') || '').toUpperCase();
const m = code.match(/^E(\d{4})N(\d{4})$/);
const tx = m && Number(m[1]) * 100, ty = m && Number(m[2]) * 100;  // zuidwesthoek in RD (meter)

const naarCode = (x, y) => vakCode(x / 100, y / 100);
const vak = VAK_THEMAS[url.get('vak')] ? url.get('vak') : 'stedelijkheid';  // gekozen tegelkaart, gaat mee terug
const tegelLink = c => `tegel.html?code=${c}${vak === 'stedelijkheid' ? '' : `&vak=${vak}`}`;
const midden = m && RD.naarLatLng(tx + VAK / 2, ty + VAK / 2);

const kaart = maakKaart();
kaart.setView(midden || START.center, midden ? 14 : START.zoom);

if (!m) {
  document.getElementById('gegevens').innerHTML = '<p>Geen geldige tegelcode in de link (verwacht bv. <code>?code=E0940N4825</code>).</p>';
} else {
  document.title = `Tegel ${code} – kaart Zuid-Holland`;
  document.getElementById('titel').textContent = `Tegel ${code}`;
  const terug = document.getElementById('terug');
  terug.href = `kaart.html?vak=${vak}&@=${midden[0].toFixed(5)},${midden[1].toFixed(5)},12`;
  // via de popup gekomen: gewoon terug in de geschiedenis, dan staat de kaart precies zoals hij was
  let vanKaart = false;
  try { vanKaart = new URL(document.referrer).pathname.replace(/\.html$/, '').endsWith('/kaart'); } catch (e) {}
  if (vanKaart) terug.addEventListener('click', e => { e.preventDefault(); history.back(); });
  for (const [id, dx, dy] of [['n', 0, 1], ['z', 0, -1], ['w', -1, 0], ['o', 1, 0]])
    document.getElementById(`naar-${id}`).href = tegelLink(naarCode(tx + dx * VAK, ty + dy * VAK));

  // de tegel zelf, dik omlijnd
  const hoeken = [[tx, ty], [tx + VAK, ty], [tx + VAK, ty + VAK], [tx, ty + VAK]].map(([x, y]) => RD.naarLatLng(x, y));
  kaart.createPane('omlijning').style.zIndex = 460;
  L.polygon(hoeken, { pane: 'omlijning', color: '#d11f3d', weight: 3, fill: false, interactive: false }).addTo(kaart);

  const thema = VAK_THEMAS.stedelijkheid;  // alleen voor de klasse in de kop

  // klik op het kaartje = naar die tegel
  kaart.on('click', e => {
    const [x, y] = RD.vanLatLng(e.latlng.lat, e.latlng.lng);
    location.href = tegelLink(naarCode(Math.floor(x / VAK) * VAK, Math.floor(y / VAK) * VAK));
  });

  const blok = `data/tegels/${Math.floor(tx / BLOK) * BLOK / 1000}_${Math.floor(ty / BLOK) * BLOK / 1000}.json`;
  Promise.all([laad(blok).catch(() => null), laad('data/gemeenten.geojson'), laad('data/vakjes/nabijheid.json')])
    .catch(fout => {
      document.getElementById('gegevens').innerHTML = '<p>De gegevens konden niet geladen worden.</p>';
      meld('De gegevens konden niet geladen worden.');
      throw fout;
    })
    .then(([b, gemeenten, sted]) => {
      L.geoJSON(gemeenten, { interactive: false, style: { color: '#000', weight: 1, opacity: 0.3, fill: false } }).addTo(kaart);
      const t = b && b.tegels[code];
      if (!t) {
        document.getElementById('gegevens').innerHTML = '<p>Van deze tegel zijn geen gegevens (buiten Zuid-Holland of zonder adressen).</p>';
        return meld('Van deze tegel zijn geen gegevens.');
      }
      const gem = gemeenten.features.find(f => f.properties.code === t.gemeente);
      const i = sted.x.findIndex((x, j) => x === tx / 100 && sted.y[j] === ty / 100);
      const klasse = i >= 0 && thema.klassen.find(k => k.waarde === sted.klasse[i]);
      document.getElementById('plek').innerHTML = [
        gem ? `Gemeente ${esc(gem.properties.naam)} (${esc(gem.properties.regio)})` : 'Buiten de Zuid-Hollandse gemeenten',
        klasse ? `Nabijheidsklasse: ${esc(klasse.naam)}` : null,
        `500 × 500 m · RD ${tx.toLocaleString('nl-NL')} / ${ty.toLocaleString('nl-NL')} (zuidwesthoek)`,
      ].filter(Boolean).join(' · ');
      const [voorzieningen, inwoners, overig] = cbsBlokken(b, t);
      document.getElementById('gegevens').innerHTML = voorzieningen + inwoners + studieBlok(b, t) + overig;
      meld('Gegevens van de tegel geladen.');
      const vink = document.getElementById('leeg-weg');
      vink.addEventListener('change', () => document.getElementById('cbs').classList.toggle('zonder-leeg', vink.checked));
    });
}

const waarde = getal;  // leeg = streepje, voorgelezen als 'geen waarde'

function studieBlok(b, t) {
  if (!t.studie) return '';
  const rijen = b.studie_velden.map((k, j) => `<tr><th scope="row"><code>${esc(k)}</code></th><td>${waarde(t.studie[j])}</td></tr>`);
  return `<section>
    <h2>Snelstudie Nabijheid / Studio Bereikbaar <span class="sub">2022</span></h2>
    <p class="sub">Nabijheidsklasse en banen: ${bronLink(VAK_THEMAS.stedelijkheid.bronnen[0])}.
      Nabijheidsscores (1–10) en OV-klassen (1 = beste) uit de snelstudie De kracht van nabijheid.</p>
    <table class="velden"><caption class="vh">Gegevens uit de snelstudie</caption><tbody>${rijen.join('')}</tbody></table>
  </section>`;
}

// Recentste waarde per CBS-veld (2024, anders 2023, anders 2022), met het jaar erbij
function recentst(b, t) {
  const jaren = Object.keys(t.cbs).sort().reverse();
  return Object.fromEntries(b.cbs_velden.map((k, j) => {
    const jaar = jaren.find(jr => t.cbs[jr][j] != null);
    return [k, jaar ? { v: t.cbs[jaar][j], jaar } : null];
  }));
}

// CBS gebruikt voor één voorziening soms twee spellingen (ziekenh_/ziekenhuis_, winkel_/winkels_ …)
const voorzieningNaam = n => n.replace(/^ziekenh_/, 'ziekenhuis_').replace(/^winkel_ov/, 'winkels_ov')
  .replace('dagelijkse_levensm', 'dagel_levensm');
const KRINGEN = ['1', '3', '5', '10', '20', '50'];
// groepen bovenaan, in deze volgorde; de rest komt alfabetisch onder 'overige voorzieningen'
const GROEPEN = {
  onderwijs: ['basisonderwijs', 'voortgezet_onderwijs', 'vmbo', 'havo_vwo'],
  'supermarkt, huisarts, ziekenhuis': ['grote_supermarkt', 'huisartsenpraktijk', 'huisartsenpost',
    'ziekenhuis_incl_buitenpoli', 'ziekenhuis_excl_buitenpoli'],
  ontmoeten: ['cafe', 'cafetaria', 'restaurant', 'bibliotheek', 'bioscoop', 'theater', 'zwembad', 'poppodium'],
};
const WAARVAN = ['vmbo', 'havo_vwo'];  // deel van voortgezet_onderwijs, extra ingesprongen

// CBS-velden voor het blok inwoners, met kolomkop
const INWONERS = {
  aantal_inwoners: 'totaal', aantal_inwoners_0_tot_15_jaar: '0–15 jaar', aantal_inwoners_15_tot_25_jaar: '15–25 jaar',
  aantal_inwoners_25_tot_45_jaar: '25–45 jaar', aantal_inwoners_45_tot_65_jaar: '45–65 jaar',
  aantal_inwoners_65_jaar_en_ouder: '65 jaar en ouder',
};

// Geeft [blok voorzieningen, blok inwoners, blok overige gegevens]
function cbsBlokken(b, t) {
  if (!Object.keys(t.cbs).length) return ['', '', ''];
  const w = recentst(b, t);
  const nieuwst = Object.keys(t.cbs).sort().pop();
  // ouder jaartal staat zichtbaar bij het getal (niet alleen bij de muis)
  const cel = x => x ? `<td>${getal(x.v)}${x.jaar === nieuwst ? '' : ` <span class="jaar">(${x.jaar})</span>`}</td>` : `<td>${LEEG}</td>`;

  // voorzieningen: dichtstbijzijnde_<naam>_afst(and)_in_km en <naam>_aantal_binnen_<n>_km
  const vz = {}, overig = [];
  for (const k of b.cbs_velden) {
    let m = k.match(/^dichtstbijzijnde_(.+?)_(afstand|afst)_in_km$/);
    if (m) { const r = vz[voorzieningNaam(m[1])] ??= {}; if (!r.afst || w[k]) r.afst = w[k]; continue; }
    m = k.match(/^(.+)_aantal_binnen_(\d+)_km$/);
    if (m) { (vz[voorzieningNaam(m[1])] ??= {})[m[2]] = w[k]; continue; }
    if (!(k in INWONERS)) overig.push(k);
  }
  const rij = n => {
    const r = vz[n];
    const waarvan = WAARVAN.includes(n);
    return `<tr class="${waarvan ? 'in2' : 'in'}"><th scope="row">${waarvan ? 'waarvan ' : ''}<code>${esc(n)}</code></th>${cel(r.afst)}${
      KRINGEN.map(km => km in r ? cel(r[km]) : '<td></td>').join('')}</tr>`;
  };
  const groep = naam => `<tr class="groep"><th colspan="${KRINGEN.length + 2}" scope="rowgroup">${naam}</th></tr>`;
  const vzRijen = [], gehad = new Set();
  for (const [naam, lijst] of Object.entries(GROEPEN)) {
    const n = lijst.filter(n => n in vz);
    n.forEach(x => gehad.add(x));
    if (n.length) vzRijen.push(groep(naam), ...n.map(rij));
  }
  vzRijen.push(groep('overige voorzieningen'), ...Object.keys(vz).filter(n => !gehad.has(n)).sort().map(rij));

  const overRijen = overig.map(k => `<tr${w[k] ? '' : ' class="geheel-leeg"'}><th scope="row"><code>${esc(k)}</code></th>${cel(w[k])}</tr>`);
  const bron = `<p class="sub">${bronLink(VAK_THEMAS.stedelijkheid.bronnen[1])}, originele CBS-namen.
    Per veld de recentste waarde uit 2022–${nieuwst}; komt een waarde uit een ouder jaar, dan staat dat jaar erachter.
    – = geheim (te weinig inwoners of woningen) of niet beschikbaar; aantallen afgerond op vijftallen.</p>`;

  const inw = Object.entries(INWONERS);
  const totaal = w.aantal_inwoners && w.aantal_inwoners.v;
  const aandeel = x => x && totaal ? `<td>${Math.round(x.v / totaal * 100)} %</td>` : '<td></td>';
  const inwoners = `<section>
    <h2>Inwoners <span class="sub">CBS</span></h2>
    <table class="velden inwoners"><caption class="vh">Inwoners naar leeftijd</caption><thead><tr><th></th>${inw.map(([, kop]) => `<th scope="col">${kop}</th>`).join('')}</tr></thead>
      <tbody><tr><th scope="row">aantal</th>${inw.map(([k]) => cel(w[k])).join('')}</tr>
        <tr><th scope="row">aandeel</th>${inw.map(([k]) => aandeel(w[k])).join('')}</tr></tbody></table>
  </section>`;

  return [`<section>
    <h2>Voorzieningen in de buurt <span class="sub">CBS</span></h2>
    ${bron}
    <table class="velden voorzieningen"><caption class="vh">Afstand tot en aantal voorzieningen</caption><thead><tr><th scope="col">voorziening</th><th scope="col">dichtstbijzijnde (km)</th>
      ${KRINGEN.map(km => `<th scope="col">aantal binnen ${km} km</th>`).join('')}</tr></thead>
      <tbody>${vzRijen.join('')}</tbody></table>
  </section>`, inwoners, `<section id="cbs">
    <h2>Overige CBS-gegevens</h2>
    ${bron}
    <label class="vink"><input type="checkbox" id="leeg-weg"> velden zonder waarde verbergen</label>
    <table class="velden"><caption class="vh">Overige CBS-gegevens</caption><thead><tr><th scope="col">veld</th><th scope="col">waarde</th></tr></thead>
      <tbody>${overRijen.join('')}</tbody></table>
  </section>`];
}
