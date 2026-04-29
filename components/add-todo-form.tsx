"use client"

import { useActionState, useEffect, useRef } from "react"
import { createTodo } from "@/app/actions/todos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

type ActionState = { error?: string } | null

export function AddTodoForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(createTodo, null)
  const formRef = useRef<HTMLFormElement>(null)
  const wasSubmittingRef = useRef(false)

  useEffect(() => {
    if (pending) {
      wasSubmittingRef.current = true
    } else if (wasSubmittingRef.current && state === null) {
      wasSubmittingRef.current = false
      formRef.current?.reset()
    }
  }, [pending, state])

  return (
    <form ref={formRef} action={action} className="rounded-lg border border-border bg-card p-5">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="todo-title">Task</Label>
          <Input
            id="todo-title"
            name="title"
            placeholder="What needs to be done?"
            autoComplete="off"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="todo-priority">Priority</Label>
          <NativeSelect id="todo-priority" name="priority" defaultValue="medium">
            <NativeSelectOption value="high">High</NativeSelectOption>
            <NativeSelectOption value="medium">Medium</NativeSelectOption>
            <NativeSelectOption value="low">Low</NativeSelectOption>
          </NativeSelect>
        </div>
        <Button type="submit" disabled={pending} className="sm:self-end">
          {pending ? "Adding…" : "Add Task"}
        </Button>
      </div>
      {state?.error && (
        <p className="mt-3 text-sm text-destructive">{state.error}</p>
      )}
    </form>
  )
}
