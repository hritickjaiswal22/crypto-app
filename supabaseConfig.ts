import { SUPABASE_API_KEY, SUPABASE_URL } from "@env";

import "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = SUPABASE_URL;
const supabaseApiKey = SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseApiKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export { supabase };
