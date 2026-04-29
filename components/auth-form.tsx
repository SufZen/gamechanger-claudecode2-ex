"use client"

import { useActionState, useState } from "react"
import { login, signup } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type AuthState = { error?: string; success?: string } | null

export function AuthForm() {
  const [tab, setTab] = useState<"login" | "signup">("login")
  const [loginState, loginAction, loginPending] = useActionState<AuthState, FormData>(
    login,
    null
  )
  const [signupState, signupAction, signupPending] = useActionState<AuthState, FormData>(
    signup,
    null
  )

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-[family-name:var(--font-heading)] tracking-tight">
          {tab === "login" ? "Welcome back" : "Create account"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {tab === "login"
            ? "Sign in to your GameChanger account"
            : "Get started with GameChanger today"}
        </p>
      </div>

      <div className="flex gap-1 mb-6 p-1 rounded-lg bg-muted">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={cn(
            "flex-1 rounded-md py-1.5 text-sm font-medium transition-all",
            tab === "login"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={cn(
            "flex-1 rounded-md py-1.5 text-sm font-medium transition-all",
            tab === "signup"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Sign Up
        </button>
      </div>

      {tab === "login" && (
        <form action={loginAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          {loginState?.error && (
            <p className="text-sm text-destructive">{loginState.error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loginPending}>
            {loginPending ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      )}

      {tab === "signup" && (
        <form action={signupAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>
          {signupState?.error && (
            <p className="text-sm text-destructive">{signupState.error}</p>
          )}
          {signupState?.success && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              {signupState.success}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={signupPending}>
            {signupPending ? "Creating account…" : "Create Account"}
          </Button>
        </form>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <span className="underline cursor-pointer hover:text-foreground transition-colors">
          Terms of Service
        </span>
      </p>
    </div>
  )
}
