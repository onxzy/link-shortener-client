import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://sb-api.links.onxzy.dev"

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjcwMjgxMjAwLAogICAgImV4cCI6IDE4MjgwNDc2MDAKfQ._kpYzjEXLCwUMmplNq6tYnK7R7moo3j3dZguVSomFSE"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
