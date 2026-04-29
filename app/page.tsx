import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const username = user?.email?.split("@")[0] ?? "there"

  return (
    <main className="min-h-[calc(100vh-4rem)] p-8 lg:p-12">
      <div className="mx-auto max-w-6xl w-full">
        <div className="mb-2">
          <span className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            Dashboard
          </span>
        </div>
        <h1 className="text-3xl font-[family-name:var(--font-heading)] tracking-tight">
          Welcome back,{" "}
          <em className="not-italic text-muted-foreground">{username}</em>
        </h1>
        <div className="mt-2 h-px w-12 bg-amber-500" />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Projects", value: "0", desc: "Active projects" },
            { label: "Tasks", value: "0", desc: "Pending tasks" },
            { label: "Team", value: "1", desc: "Members" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-6 hover:border-amber-500/40 transition-colors"
            >
              <div className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                {stat.label}
              </div>
              <div className="mt-2 text-3xl font-[family-name:var(--font-heading)] font-bold">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border border-dashed p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Your workspace is ready. Start building.
          </p>
          <div className="mt-3 h-px w-8 mx-auto bg-amber-500" />
        </div>
      </div>
    </main>
  )
}
