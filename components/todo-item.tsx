"use client"

import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Todo, Priority } from "@/app/actions/todos"

const priorityConfig: Record<
  Priority,
  { label: string; variant: "outline" | "secondary"; className: string }
> = {
  high:   { label: "High",   variant: "outline",   className: "border-amber-500/60 text-amber-600 dark:text-amber-400" },
  medium: { label: "Medium", variant: "secondary",  className: "" },
  low:    { label: "Low",    variant: "outline",    className: "text-muted-foreground" },
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, done: boolean) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priority = priorityConfig[todo.priority]

  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-card px-5 py-4 hover:border-amber-500/40 transition-colors">
      <Checkbox
        checked={todo.done}
        onCheckedChange={() => onToggle(todo.id, todo.done)}
        aria-label={`Mark "${todo.title}" as ${todo.done ? "incomplete" : "complete"}`}
      />

      <span
        className={cn(
          "flex-1 text-sm transition-colors",
          todo.done && "line-through text-muted-foreground"
        )}
      >
        {todo.title}
      </span>

      <Badge variant={priority.variant} className={priority.className}>
        {priority.label}
      </Badge>

      <Button
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
      >
        <Trash2 />
      </Button>
    </div>
  )
}
