// ============================================================
// ============================================================
// supabase.js
// owns: primary data client
// ============================================================

import { createClient } from "@supabase/supabase-js";

// publishable key only. the service key never touches the
// browser and lives in the edge function environment.
const sb = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export { sb };