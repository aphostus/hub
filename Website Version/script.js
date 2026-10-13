// ============================================================
// ============================================================
// script.js
// owns: device detection, forward to version
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

const laptopTokens = [
  /Windows NT/i,
  /Macintosh/i,
  /X11/i,
  /CrOS/i,
];

// ------------------------------------------------------------
// routes
// ------------------------------------------------------------

const routes = {
  mobile: "@Mobile Version/Mobile.html",
  tablet: "@Tablet Version/Tablet.html",
  laptop: "@Laptop Version/Laptop.html",
  dynamic: "@Dynamic Version/Dynamic.html",
  error: "@Error Version/Error.html",
};

// ------------------------------------------------------------
// detect
// ------------------------------------------------------------

// returns the version key, dynamic on no match
function detectDevice(ua) {
  if (mobileTokens.some((t) => t.test(ua))) return "mobile";
  if (tabletTokens.some((t) => t.test(ua))) return "tablet";
  if (laptopTokens.some((t) => t.test(ua))) return "laptop";
  return "dynamic";
}

// ------------------------------------------------------------
// gate
// ------------------------------------------------------------

const ua = navigator.userAgent;
const device = detectDevice(ua);
const target = routes[device];

// boot screen holds for at least one second so the glow lands
// the head check runs in parallel, whichever finishes last wins
const bootDelay = new Promise((r) => setTimeout(r, 1000));

const headCheck = fetch(target, { method: "HEAD" })
  .then((res) => (res.ok ? target : routes.error + "?tag=Error"))
  .catch(() => routes.error + "?tag=Error");

Promise.all([headCheck, bootDelay]).then(([dest]) => {
  window.location.replace(dest);
});