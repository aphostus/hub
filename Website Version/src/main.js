// ============================================================
// ============================================================
// main.js
// owns: vite entry, loads the xdb stack
// ============================================================

import { auth } from "./Operator Sources/xdbs.fct/database.js";

console.log("[VITE] main.js loaded, auth ready:", !!auth);