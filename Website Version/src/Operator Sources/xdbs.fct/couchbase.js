// ============================================================
// ============================================================
// couchbase.js
// owns: archive reads via edge function
// ============================================================

// the browser never touches couchbase directly. this file calls
// a supabase edge function, which holds the couchbase keys and
// talks to capella on our behalf. reads only, on primary miss.
const ARCHIVE_URL =
  import.meta.env.VITE_SUPABASE_URL + "/functions/v1/archive";

// returns the archived row on hit, null on miss, throws on failure
export async function archiveLookup(query) {
  const res = await fetch(ARCHIVE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "lookup", query })
  });

  if (!res.ok) {
    throw new Error("archive lookup failed: " + res.status);
  }

  const data = await res.json();
  return data.hit || null;
}

// pulls a row out of the archive so the caller can reinsert it
// into supabase. does not write to supabase itself.
export async function archiveRestore(id) {
  const res = await fetch(ARCHIVE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "restore", id })
  });

  if (!res.ok) {
    throw new Error("archive restore failed: " + res.status);
  }

  const data = await res.json();
  return data.row || null;
}