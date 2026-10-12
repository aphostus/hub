// ============================================================
// ============================================================
// script.js
// owns: device detection, boot delay, forward to version
// ============================================================

// ------------------------------------------------------------
// tokens
// ------------------------------------------------------------

const mobileTokens = [
  /Android.*Mobile/i,
  /iPhone/i,
  /iPod/i,
  /Windows Phone/i,
  /BlackBerry/i,
  /Opera Mini/i,
  /IEMobile/i,
];

const tabletTokens = [
  /iPad/i,
  /Android(?!.*Mobile)/i,
  /Tablet/i,
];

// ------------------------------------------------------------
// routes
// ------------------------------------------------------------

const routes = {
  mobile: "Mobile Version/Mobile.html",
  tablet: "Tablet Version/Tablet.html",
  desktop: "Desktop Version/Desktop.html",
};

const errorPath = "Error Files/error.html";

// minimum boot time so the icon reads as branding, not a flicker
const minBootMs = 1000;

// ------------------------------------------------------------
// detect
// ------------------------------------------------------------

// desktop is the fallback, anything not phone or tablet goes there
function detectDevice(ua) {
  if (tabletTokens.some((t) => t.test(ua))) return "tablet";
  if (mobileTokens.some((t) => t.test(ua))) return "mobile";
  return "desktop";
}

// ------------------------------------------------------------
// boot
// ------------------------------------------------------------

const ua = navigator.userAgent;
const device = detectDevice(ua);
const target = routes[device];
const start = Date.now();

// wait on both the head check and the min boot time, whichever is longer
const headCheck = fetch(target, { method: "HEAD" })
  .then((res) => (res.ok ? target : `${errorPath}?tag=version unavailable`))
  .catch(() => `${errorPath}?tag=connection error`);

const bootDelay = new Promise((resolve) => {
  const elapsed = Date.now() - start;
  const remaining = Math.max(0, minBootMs - elapsed);
  setTimeout(() => resolve(), remaining);
});

Promise.all([headCheck, bootDelay]).then(([destination]) => {
  window.location.replace(destination);
});