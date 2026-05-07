var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/* Ondersteunt:
1. Links  
   [linktext](url)
   [linktext](url _blank) -> opent in nieuw tabblad

2. Images
   ![alt |style](url)
   ![alt](url)

3. Hide
   [+ ... ]   → wordt verwijderd

Veiligheid:
- Alleen http/https of relatieve paden toegestaan
- Tekst wordt ge-escaped
===============================================================================
*/
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeURL(url) {
  url = url.trim();

  // absolute http(s)
  try {
    let u = new URL(url);
    if (u.protocol === "http:" || u.protocol === "https:") {
      return u.href;
    }
  } catch(e) {}

  // relatieve paden toestaan (geen javascript:)
  if (/^(\/|\.\/|\.\.\/|[a-zA-Z0-9_\-\/\.]+)/.test(url) &&
      !url.startsWith("javascript:")) {
    return url;
  }

  return null;
}

function parse(text) {

  // ===== 1. HIDE [+ ... ] =====
  text = text.replace(/\[\+.*?\]/g, "");

  // ===== 2. IMAGES =====
  text = text.replace(/!\[(.*?)\]\((.*?)\)/g, function(match, altPart, urlPart) {

    let parts = altPart.split("|");
    let alt = parts[0].trim();
    let style = parts[1] ? parts[1].trim() : "max-width:100%;";

    let safe = safeURL(urlPart);
    if (!safe) return "";

    return '<img src="' + safe +
           '" alt="' + escapeHTML(alt) +
           '" style="' + escapeHTML(style) + '">';
  });

  // ===== 3. LINKS =====
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, function(match, label, urlPart) {

    urlPart = urlPart.trim();

    let target = "";
    if (urlPart.endsWith(" _blank")) {
      target = ' target="_blank" rel="noopener noreferrer"';
      urlPart = urlPart.replace(/ _blank$/, "").trim();
    }

    let safe = safeURL(urlPart);
    if (!safe) return escapeHTML(label);

    return '<a href="' + safe + '"' + target + '>' +
           escapeHTML(label) +
           '</a>';
  });

  return text;
}
}

/*
     FILE ARCHIVED ON 08:15:34 May 07, 2026 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:15:40 May 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 8.042
  captures_list: 0.521
  exclusion.robots: 0.046
  exclusion.robots.policy: 0.037
  esindex: 0.01
  cdx.remote: 8.091
  LoadShardBlock: 144.429 (3)
  PetaboxLoader3.resolve: 87.239 (3)
  PetaboxLoader3.datanode: 54.614 (3)
  load_resource: 32.317
*/