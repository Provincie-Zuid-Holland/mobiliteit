/* insluit.js - haalt inhoud.html op en zet het in de pagina waar dit script wordt ingesloten.
   Bedoeld voor een pagina die zelf niet meer gewijzigd kan worden (intranet).
   Insluiten met:
       <div id="pzh-inhoud">Inhoud wordt geladen...</div>
       <script src="https://provincie-zuid-holland.github.io/mobiliteit/fragment/insluit.js" defer></script>
   Een ander fragment tonen kan zonder deze regels aan te passen, via het doel-element:
       <div id="pzh-inhoud" data-pzh-fragment="andere.html"></div>
   Alle logica staat hier, dus techniek wijzigen kan later zonder de intranetpagina aan te raken.
*/
(function () {
  // Meteen uitlezen: na een await is document.currentScript null.
  var basis = new URL('.', document.currentScript.src).href;

  function toon(el) {
    var bron  = el.dataset.pzhFragment || 'inhoud.html';
    // ?v=<minuut> omzeilt de BROWSERcache (Pages stuurt max-age=600), maar cachet nog wel binnen een minuut.
    // De edge-cache van GitHub negeert de query-string; die wordt bij elke Pages-deploy zelf gepurged.
    var url   = new URL(bron, basis).href + '?v=' + Math.floor(Date.now() / 60000);

    fetch(url, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) { throw new Error('HTTP ' + res.status); }
        return res.text();
      })
      .then(function (html) { el.innerHTML = html; })
      .catch(function (fout) {
        console.warn('insluit.js: ophalen van ' + url + ' mislukt -', fout.message);
        // Niet leeg laten staan: altijd een werkende uitweg tonen.
        el.innerHTML = '<p>Deze informatie kon niet worden geladen. ' +
          '<a href="' + new URL('pagina.html', basis).href + '" target="_blank" rel="noopener">' +
          'Bekijk de pagina rechtstreeks</a>.</p>';
      });
  }

  function start() {
    var doelen = document.querySelectorAll('#pzh-inhoud, [data-pzh-fragment]');
    if (!doelen.length) {
      console.warn('insluit.js: geen <div id="pzh-inhoud"> gevonden op deze pagina.');
      return;
    }
    Array.prototype.forEach.call(doelen, toon);
  }

  // Werkt ook als het script zonder defer of boven de div is ingesloten.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
