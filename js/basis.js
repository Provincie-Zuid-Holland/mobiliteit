// Basiskaart: achtergrond en URL-instellingen. Gedeeld door alle kaarten.

const MAPBOX_TOKEN = 'pk.eyJ1Ijoicm9yb3JvIiwiYSI6ImNsMWIzcjhiZDI0ZG8zaXF6eXE4dXE5emUifQ.gt3tunhffMqPmsInRj0mGQ';
const START = { center: [51.95, 4.55], zoom: 10 };

const url = new URLSearchParams(location.search);

function maakKaart() {
  const opties = { ...START, zoomSnap: 0.5 };
  const at = (url.get('@') || '').split(',').map(Number);
  if (at.length >= 2 && at.every(isFinite)) {
    opties.center = [at[0], at[1]];
    if (at[2]) opties.zoom = at[2];
  } else if (url.get('zoom')) {
    opties.zoom = Number(url.get('zoom'));
  }

  const kaart = L.map('kaart', { ...opties, zoomControl: false });
  L.control.zoom({ zoomInTitle: 'Inzoomen', zoomOutTitle: 'Uitzoomen' }).addTo(kaart);
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={token}', {
    token: MAPBOX_TOKEN, tileSize: 512, zoomOffset: -1, maxZoom: 18,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
  }).addTo(kaart);

  fullscreenKnop(kaart);
  toegankelijkePopups(kaart);
  return kaart;
}

// Popups: Nederlandse sluitknop; met het toetsenbord geopend → focus erin, na sluiten terug naar de kaart
let viaToets = false;
function toegankelijkePopups(kaart) {
  let focusErin = false;
  kaart.on('popupopen', e => {
    const el = e.popup.getElement();
    el.querySelector('.leaflet-popup-close-button')?.setAttribute('aria-label', 'Info sluiten');
    focusErin = viaToets;
    viaToets = false;
    if (focusErin) {
      const inhoud = el.querySelector('.leaflet-popup-content');
      inhoud.tabIndex = -1;
      inhoud.focus();
    }
  });
  kaart.on('popupclose', () => {
    if (focusErin) kaart.getContainer().focus();
    focusErin = false;
  });
  // Esc in de popup (Leaflet luistert alleen als de kaart zelf de focus heeft)
  kaart.getContainer().addEventListener('keydown', e => {
    if (e.key === 'Escape' && e.target.closest('.leaflet-popup')) { focusErin = true; kaart.closePopup(); }
  });
}

// Popup openen met de focus erin (toetsenbord, zoeken)
function openInfo(kaart, latlng, html) {
  viaToets = true;
  L.popup({ maxWidth: 260 }).setLatLng(latlng).setContent(html).openOn(kaart);
}

// Korte melding voor schermlezers (role=status in de pagina)
function meld(tekst) {
  const el = document.getElementById('status');
  if (!el) return;
  el.textContent = '';
  setTimeout(() => { el.textContent = tekst; }, 50);  // leegmaken en opnieuw zetten, zodat dezelfde tekst ook weer gelezen wordt
}

// Alleen waar het zin heeft: browser kan fullscreen (in een iframe alleen met allowfullscreen)
// en het scherm is breder dan een telefoon
function fullscreenKnop(kaart) {
  if (!document.fullscreenEnabled || screen.width < 600) return;
  const knop = L.control({ position: 'topleft' });
  knop.onAdd = () => {
    const div = L.DomUtil.create('div', 'leaflet-bar');
    div.innerHTML = '<button type="button" class="fullscreen"><span aria-hidden="true"></span></button>';
    const el = div.firstChild;
    L.DomEvent.disableClickPropagation(div);
    const zet = () => {
      const vol = !!document.fullscreenElement;
      el.firstChild.textContent = vol ? '✕' : '⛶';
      el.title = vol ? 'Volledig scherm sluiten' : 'Volledig scherm';
      el.setAttribute('aria-label', el.title);
    };
    el.addEventListener('click', () => {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    });
    document.addEventListener('fullscreenchange', zet);
    zet();
    return div;
  };
  knop.addTo(kaart);
}

function laad(pad) {
  return fetch(pad).then(r => {
    if (!r.ok) throw new Error(`${pad}: ${r.status}`);
    return r.json();
  });
}

// URL bijwerken zonder te herladen, zodat de huidige weergave deelbaar is
function zetUrl(sleutel, waarde) {
  if (waarde) url.set(sleutel, waarde); else url.delete(sleutel);
  const q = url.toString();
  history.replaceState(null, '', q ? `?${q}` : location.pathname);
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Paneel inklappen; op een smal scherm (of in een kleine iframe) begint het ingeklapt
function paneelKnop() {
  const knop = document.getElementById('paneel-knop');
  const zet = open => {
    knop.setAttribute('aria-expanded', open);
    document.getElementById('paneel').classList.toggle('dicht', !open);
  };
  knop.addEventListener('click', () => zet(knop.getAttribute('aria-expanded') !== 'true'));
  if (innerWidth < 600 || innerHeight < 450) zet(false);
}
