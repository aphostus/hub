// ============================================================
// ============================================================
// error.js
// owns: read error tag from url, render it
// ============================================================

// ------------------------------------------------------------
// tag
// ------------------------------------------------------------

const tag = new URLSearchParams(location.search).get("tag");
const errTag = document.getElementById("errTag");

if (tag) errTag.textContent = tag;