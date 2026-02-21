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