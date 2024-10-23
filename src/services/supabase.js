import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://smxhnrbajtkllhirdxyj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNteGhucmJhanRrbGxoaXJkeHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NTUzNjAsImV4cCI6MjA0NTIzMTM2MH0.HeqeMUaji9hbPcML0iMVAoii6I2QWM67O6OThVQbBjU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
