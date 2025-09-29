// src/lib/auth.js
import { supabase } from './supabaseClient';

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}
