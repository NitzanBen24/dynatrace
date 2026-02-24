import 'server-only';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  'https://qmpbrqnvutizjgzndfwj.supabase.co';
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtcGJycW52dXRpempnem5kZndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2NTI1OTYsImV4cCI6MjA0MDIyODU5Nn0.074p8MBYY9GXCG_yKM95IJB5UILYt52U0IGFzdt1maQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
