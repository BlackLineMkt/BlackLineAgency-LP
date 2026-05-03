import { createClient } from "@supabase/supabase-js";

// Cliente Supabase dedicado ao registro de leads vindos da landing page.
// Usa a anon key pública (segura no client) e RLS no projeto destino.
export const leadsSupabase = createClient(
  "https://wzbfveszjumxshuatzzc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6YmZ2ZXN6anVteHNodWF0enpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNTExODMsImV4cCI6MjA5MjcyNzE4M30.pVCzQ59dG7K4gvdrDroZH1LLxZ0XqtqxOc9uH0gPPoU",
);

export const LEADS_STUDIO_ID = "c7f9ab76-f223-4b04-8fb6-fd63fee979b5";
