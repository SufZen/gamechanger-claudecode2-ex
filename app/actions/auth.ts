"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

type AuthState = { error?: string; success?: string } | null

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  if (error) return { error: error.message }

  redirect("/")
}

export async function signup(_: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) return { error: error.message }

  if (data.session) redirect("/")

  return { success: "Check your email to confirm your account." }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}
