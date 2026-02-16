import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL // Cambia esto si no usas Vite
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY // Cambia esto si no usas Vite

export const supabase = createClient(supabaseUrl, supabaseAnonKey)