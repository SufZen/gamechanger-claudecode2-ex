"use client"

import { useOptimistic, useTransition } from "react"
import { toggleTodo, deleteTodo } from "@/app/actions/todos"
import type { Todo, OptimisticAction } from "@/app/actions/todos"
import { TodoItem } from "@/components/todo-item"

function reducer(state: Todo[], action: OptimisticAction): Todo[] {
  switch (action.type) {
    case "toggle":
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t))
    case "delete":
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

export function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, dispatch] = useOptimistic(todos, reducer)
  const [, startTransition] = useTransition()

  function handleToggle(id: string, done: boolean) {
    startTransition(async () => {
      dispatch({ type: "toggle", id })
      await toggleTodo(id, !done)
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      dispatch({ type: "delete", id })
      await deleteTodo(id)
    })
  }

  if (optimisticTodos.length === 0) {
    return (
      <div className="rounded-lg border border-border border-dashed p-12 text-center">
        <span className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
          No tasks yet
        </span>
        <p className="mt-3 text-sm text-muted-foreground">
          Add your first task above to get started.
        </p>
        <div className="mt-3 h-px w-8 mx-auto bg-amber-500" />
      </div>
    )
  }

  const remaining = optimisticTodos.filter((t) => !t.done).length

  return (
    <div className="flex flex-col gap-2">
      {optimisticTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
      <p className="mt-2 px-1 text-xs font-mono text-muted-foreground">
        {remaining} task{remaining !== 1 ? "s" : ""} remaining
      </p>
    </div>
  )
}
