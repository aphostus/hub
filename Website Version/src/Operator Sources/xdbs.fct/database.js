// ============================================================
// ============================================================
// database.js
// owns: xdb entry point, one import for the whole stack
// ============================================================

// every file in the app imports from here, not from the three
// backends directly. one entry point means one place to change
// if a backend moves or is swapped.
export * from "./firebase.js";
export * from "./supabase.js";
export * from "./couchbase.js";