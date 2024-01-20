import { Database } from "@/supabase/types/supabase";
import { createClient } from "@supabase/supabase-js";

// 사용자 키 (ANON_KEY)
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);