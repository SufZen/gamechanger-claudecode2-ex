"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export type Priority = "high" | "medium" | "low"

export type Todo = {
  id: string
  title: string
  priority: Priority
  done: boolean
  created_at: string
  user_id: string
}

export type OptimisticAction =
  | { type: "toggle"; id: string }
  | { type: "delete"; id: string }

type ActionState = { error?: string } | null

export async function createTodo(_: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const title = (formData.get("title") as string)?.trim()
  const priority = (formData.get("priority") as Priority) ?? "medium"

  if (!title) return { error: "Title is required" }
  if (!["high", "medium", "low"].includes(priority)) return { error: "Invalid priority" }

  const { error } = await supabase.from("todos").insert({ title, priority, user_id: user.id })

  if (error) return { error: error.message }

  revalidatePath("/todos")
  return null
}

export async function toggleTodo(id: string, done: boolean): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("todos")
    .update({ done })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw new Error(error.message)
  revalidatePath("/todos")
}

export async function deleteTodo(id: string): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw new Error(error.message)
  revalidatePath("/todos")
}
