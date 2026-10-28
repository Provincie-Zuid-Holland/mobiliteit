// Vakjes van 500 m (CBS-raster) als één canvas-laag: per kaarttegel getekend uit kolommen x/y/waarde,
// klik → RD → vakjescode → popup. Thema's hieronder; hooguit één thema tegelijk aan.
// URL: vak=<id> (bv. vak=stedelijkheid), en de oude par=1…10 werkt ook.

const BESTAND = 'data/vakjes/nabijheid.json';  // alle tegelkaarten uit één bestand (tools/vakjes_export.py)
const BRON_CBS = { wat: 'Inwoners en woningen', naam: 'CBS, vierkantstatistieken 500 m (2024)',
  link: 'https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische-data/kaart-van-500-meter-bij-500-meter-met-statistieken' };
const BRON_STUDIE = { wat: 'Scores', naam: 'Snelstudie De ideale wijk in Zuid-Holland (2022), methode in bijlage 1 en 2',
  link: 'https://provincie-zuid-holland.github.io/mobiliteit/snelstudie/pdf/Snelstudie-De-ideale-wijk-in-Zuid-Holland.pdf' };
const BRON_SB = { wat: 'Klasse en banen', naam: 'Studio Bereikbaar – Dashboard Verstedelijking (2022)',
  link: 'https://www.studiobereikbaar.nl/projecten/dashboard-verstedelijking/' };

// Rapportcijfer 1–10 → klasse 1…9 (zoals de oude kaart: 9,x telt als 9), groen = goed
const GROEN = ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'];
const scoreThema = (kolom, naam, par, uitleg) => ({
  naam, par, kolom, bronnen: [BRON_STUDIE, BRON_CBS], uitleg,
  klassen: GROEN.map((kleur, j) => ({ waarde: j + 1, kleur, naam: j === 8 ? '9 – 10 (uitstekend)' : j ? String(j + 1) : '1 (slecht)' })).reverse(),
  klasseVan: v => v == null ? null : Math.min(Math.max(Math.floor(v), 1), 9),
  regel: (d, i) => `${esc(naam)}: ${getal(d[kolom][i])} <span class="klein">(score 1–10)</span>`,
});
const ovThema = (kolom, naam, par, klassen) => ({
  naam, par, kolom, bronnen: [{ ...BRON_SB, wat: 'OV-klassen' }, BRON_CBS],
  klassen: ['#004529', '#238443', '#78c679', '#addd8e', '#d9f0a3', '#ffffe5'].map((kleur, j) => ({ waarde: j + 1, kleur, naam: klassen[j] })),
  regel: (d, i, k) => `${esc(naam)}: ${esc(k.naam)}`,
});

const VAK_THEMAS = {
  stedelijkheid: {
    naam: 'Nabijheidsklasse', par: '10', kolom: 'klasse', bronnen: [BRON_SB, BRON_CBS],
    klassen: [  // kleuren van de oude kaart (snelstudie De kracht van nabijheid)
      { waarde: 1, naam: 'Hoog stedelijk', kleur: '#87477f', uitleg: '> 12.500' },
      { waarde: 2, naam: 'Stedelijk',      kleur: '#d92023', uitleg: '6.000 – 12.500' },
      { waarde: 3, naam: 'Suburbaan',      kleur: '#f19353', uitleg: '4.000 – 6.000' },
      { waarde: 4, naam: 'Laag suburbaan', kleur: '#fede99', uitleg: '2.000 – 4.000' },
      { waarde: 5, naam: 'Dorps',          kleur: '#faf0ca', uitleg: '1.000 – 2.000' },
      { waarde: 6, naam: 'Landelijk',      kleur: '#f5efe6', uitleg: '< 1.000' },
    ],
    regel: (d, i, klasse) => `Nabijheidsklasse: ${esc(klasse.naam)}`,
  },
  voorzieningen: scoreThema('voorzieningen', 'Voorzieningen (gemiddeld)', '1', 'gemiddelde van winkels, onderwijs, zorg, sport & cultuur, horeca en groen'),
  winkels: scoreThema('winkels', 'Winkels', '2', 'supermarkten, levensmiddelenwinkels, warenhuizen'),
  onderwijs: scoreThema('onderwijs', 'Onderwijs', '3', 'kinderopvang, basisscholen, middelbare scholen'),
  zorg: scoreThema('zorg', 'Zorg', '4', 'apotheken, huisartsen, tandartsen, fysiotherapeuten, ziekenhuizen'),
  sport: scoreThema('sport_cultuur', 'Sport, cultuur & recreatie', '5', 'bibliotheken, theaters, podia, musea, bioscopen, zwembaden'),
  horeca: scoreThema('horeca', 'Horeca', '6', 'cafés, restaurants'),
  groen: scoreThema('groen', 'Groen', '7', 'aandeel park, bos, natuur en recreatiewater binnen 1,5 × 1,5 km'),
  ov_lokaal: ovThema('ov_lokaal', 'OV lokaal', '8',
    ['1 (beste)', '2', '3', '4', '5', '6']),
  ov: ovThema('ov_omgeving', 'OV', '9', [
    'Primair IC-station op max. 2,5 km', 'Secundair IC-station op max. 1,75 km of gelijkwaardig',
    'Sprinterstation op max. 1,25 km of gelijkwaardig', 'Hoogwaardig OV op max. 750 m',
    'Basis-OV op max. 500 m', 'Beperkt OV op max. 500 m']),
};
// volgorde in de keuzelijst
const VAK_VOLGORDE = ['stedelijkheid', 'voorzieningen', 'ov', 'winkels', 'onderwijs', 'zorg', 'sport', 'horeca', 'groen', 'ov_lokaal'];

const VAK = 500;  // meter
let vakActief = null;  // { thema, data, index }

// lege waarde: zichtbaar een streepje, voorgelezen als 'geen waarde'
const LEEG = '<span class="leeg" aria-hidden="true">–</span><span class="vh">geen waarde</span>';
const getal = v => v == null ? LEEG : Number(v).toLocaleString('nl-NL');
const vakCode = (xh, yh) => `E${String(xh).padStart(4, '0')}N${String(yh).padStart(4, '0')}`;
const vakCodeOp = latlng => {
  const [x, y] = RD.vanLatLng(latlng.lat, latlng.lng);
  return vakCode(Math.floor(x / VAK) * 5, Math.floor(y / VAK) * 5);
};

const VakLaag = L.GridLayer.extend({
  initialize(thema, data, opties) {
    L.GridLayer.prototype.initialize.call(this, opties);
    this.thema = thema;
    const kleur = Object.fromEntries(thema.klassen.map(k => [k.waarde, k.kleur]));
    const klasseVan = thema.klasseVan || (v => v);
    // hoekpunten één keer omrekenen naar kaartpixels op zoom 0; per zoom alleen nog vermenigvuldigen
    this.vakken = data.x.map((xh, i) => {
      const x = xh * 100, y = data.y[i] * 100;
      const p = [[x, y], [x + VAK, y], [x + VAK, y + VAK], [x, y + VAK]]
        .map(([a, b]) => L.CRS.EPSG3857.latLngToPoint(L.latLng(RD.naarLatLng(a, b)), 0));
      return { p, kleur: kleur[klasseVan(data[thema.kolom][i])],
               min: L.point(Math.min(...p.map(q => q.x)), Math.min(...p.map(q => q.y))),
               max: L.point(Math.max(...p.map(q => q.x)), Math.max(...p.map(q => q.y))) };
    }).filter(v => v.kleur);
  },
  createTile(coords) {
    const tegel = L.DomUtil.create('canvas'), maat = this.getTileSize(), r = devicePixelRatio || 1;
    tegel.width = maat.x * r; tegel.height = maat.y * r;
    const ctx = tegel.getContext('2d');
    ctx.scale(r, r);
    ctx.lineWidth = 0.6;  // rand in dezelfde kleur dicht de naden tussen vakjes
    const s = 2 ** coords.z, ox = coords.x * maat.x, oy = coords.y * maat.y;
    for (const v of this.vakken) {
      if (v.max.x * s < ox || v.min.x * s > ox + maat.x || v.max.y * s < oy || v.min.y * s > oy + maat.y) continue;
      ctx.beginPath();
      v.p.forEach((q, j) => ctx[j ? 'lineTo' : 'moveTo'](q.x * s - ox, q.y * s - oy));
      ctx.closePath();
      ctx.fillStyle = ctx.strokeStyle = v.kleur;
      ctx.fill(); ctx.stroke();
    }
    return tegel;
  },
});

// Info over het vakje onder een punt, of null als er geen thema aan staat / geen vakje is
// gemeente = { naam, regio } waarin het punt ligt, voor de titel
function vakInfo(latlng, gemeente) {
  if (!vakActief) return null;
  const [x, y] = RD.vanLatLng(latlng.lat, latlng.lng);
  const xh = Math.floor(x / VAK) * 5, yh = Math.floor(y / VAK) * 5;
  const i = vakActief.index.get(`${xh},${yh}`);
  if (i === undefined) return null;
  const { thema, data } = vakActief;
  const klasse = thema.klassen.find(k => k.waarde === (thema.klasseVan || (v => v))(data[thema.kolom][i]));
  if (!klasse) return null;
  const code = vakCode(xh, yh);
  const titel = gemeente ? `Gemeente ${esc(gemeente.naam)} (${esc(gemeente.regio)})` : `Tegel ${code}`;
  // de nabijheidsklasse staat er altijd, de gekozen kaart (als het een andere is) eronder
  const sted = VAK_THEMAS.stedelijkheid, sk = sted.klassen.find(k => k.waarde === data.klasse[i]);
  const regels = [sk && sted.regel(data, i, sk), thema !== sted && thema.regel(data, i, klasse),
    `Inwoners: ${getal(data.inwoners[i])} <span class="klein">(CBS 2024)</span>`,
    `Woningen: ${getal(data.woningen[i])} <span class="klein">(CBS 2024)</span>`,
    `Banen: ${getal(data.banen[i])} <span class="klein">(Studio Bereikbaar, 2022)</span>`].filter(Boolean);
  return `<h3>${titel}</h3>
    <p class="tussenkop">Over dit vakje van 500 × 500 m:</p>
    <ul class="links">${regels.map(r => `<li>${r}</li>`).join('')}</ul>
    <p class="details"><a href="tegel.html?code=${code}&vak=${vakActief.id}">Meer info over deze tegel <span aria-hidden="true">→</span></a></p>`;
}

const bronLink = b => `<a href="${esc(b.link)}" target="_blank" rel="noopener">${esc(b.naam)}</a>`;

// Thema's als vinkjes in het paneel (onder de regio's), hooguit één tegelijk
function vakjesPaneel(kaart) {
  kaart.createPane('vakjes').style.zIndex = 350;  // onder gemeenten en lijnen
  const cache = {};
  let data;  // het gedeelde bestand, één keer geladen
  // één vinkje voor de tegels, met een keuzelijst wat de kleur bepaalt
  const li = document.createElement('li');
  li.innerHTML = `<label><input type="checkbox"> 500 × 500 m tegels</label>
    <select class="vak-thema" aria-label="Kleur de tegels naar">${VAK_VOLGORDE.map(id => [id, VAK_THEMAS[id]])
      .map(([id, t]) => `<option value="${id}">${esc(t.naam)}</option>`).join('')}</select>
    <ul class="legenda klein vlak-vol"></ul>`;
  document.getElementById('lagen').prepend(li);
  const vink = li.querySelector('input'), keuze = li.querySelector('select'), legenda = li.querySelector('ul');

  let laag;
  const zet = async id => {
    vink.checked = !!id;
    li.classList.toggle('aan', !!id);
    if (id) keuze.value = id;
    zetUrl('vak', id);
    zetUrl('par', null);
    if (laag) kaart.removeLayer(laag);
    laag = vakActief = null;
    legenda.innerHTML = '';
    if (!id) return;
    const thema = VAK_THEMAS[id];
    legenda.innerHTML = `${legendaHtml(thema.klassen)}<li class="bron">Bron: ${bronLink(thema.bronnen[0])}</li>`;
    try {
      data ??= await laad(BESTAND).then(d => ({ d, index: new Map(d.x.map((x, i) => [`${x},${d.y[i]}`, i])) }));
    } catch (fout) {
      legenda.insertAdjacentHTML('afterbegin', '<li>De tegels konden niet geladen worden.</li>');
      return meld('De tegels konden niet geladen worden.');
    }
    cache[id] ??= { id, thema, data: data.d, index: data.index,
                    laag: new VakLaag(thema, data.d, { pane: 'vakjes', opacity: id === 'stedelijkheid' ? 0.7 : 0.55 }) };
    if (keuze.value !== id || !vink.checked) return;  // intussen iets anders gekozen
    vakActief = cache[id];
    laag = vakActief.laag.addTo(kaart);
    meld(`Tegels gekleurd naar ${thema.naam}`);
  };
  vink.addEventListener('change', () => zet(vink.checked ? keuze.value : null));
  keuze.addEventListener('change', () => zet(keuze.value));

  const viaPar = Object.keys(VAK_THEMAS).find(id => VAK_THEMAS[id].par === url.get('par'));
  const start = VAK_THEMAS[url.get('vak')] ? url.get('vak') : viaPar;
  if (start) zet(start);
  return !!start;
}
