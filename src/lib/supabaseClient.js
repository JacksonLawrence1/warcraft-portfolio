import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ANON } from '$env/static/private';

export const supabase = createClient('https://oytkrnunnjfzrnzbfnar.supabase.co', SUPABASE_ANON)