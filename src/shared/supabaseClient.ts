import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

type SupabaseConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};

const supabaseConfig: SupabaseConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_PROJECT_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

const supabase = createClient<Database>(
  supabaseConfig.supabaseUrl,
  supabaseConfig.supabaseKey
);

export default supabase;
