import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AddTodoForm } from "@/components/add-todo-form"
import { TodoList } from "@/components/todo-list"
import type { Todo } from "@/app/actions/todos"

export const metadata = {
  title: "Tasks — GameChanger",
}

export default async function TodosPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false })

  const todos = (data as Todo[]) ?? []

  return (
    <main className="min-h-[calc(100vh-4rem)] p-8 lg:p-12">
      <div className="mx-auto max-w-2xl w-full">
        <span className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
          Task Manager
        </span>
        <h1 className="mt-5 text-3xl font-[family-name:var(--font-heading)] tracking-tight">
          Your Tasks
        </h1>
        <div className="mt-2 h-px w-12 bg-amber-500" />

        <div className="mt-10">
          <AddTodoForm />
        </div>

        <div className="mt-6">
          <TodoList todos={todos} />
        </div>
      </div>
    </main>
  )
}
