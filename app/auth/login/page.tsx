import { AuthForm } from "@/components/auth-form"

export const metadata = {
  title: "Sign In — GameChanger",
}

export default function LoginPage() {
  return (
    <div className="min-h-svh flex">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-foreground text-background p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-background text-foreground text-[11px] font-bold tracking-widest select-none">
            GC
          </div>
          <span className="font-semibold tracking-tight text-sm">GameChanger</span>
        </div>

        <div>
          <div className="h-px w-12 bg-amber-500 mb-8" />
          <h1 className="text-4xl font-[family-name:var(--font-heading)] leading-tight tracking-tight">
            Build things
            <br />
            <em className="not-italic text-background/55">that matter.</em>
          </h1>
          <p className="mt-6 text-background/45 text-sm leading-relaxed max-w-xs">
            Sign in to access your workspace and start making a difference.
          </p>
        </div>

        <p className="font-mono text-[10px] tracking-[0.35em] text-background/25 uppercase">
          Est. 2024
        </p>
      </div>

      {/* Right: Form */}
      <div className="flex flex-1 items-center justify-center p-8 lg:p-16">
        <AuthForm />
      </div>
    </div>
  )
}
