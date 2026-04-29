"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  userEmail?: string
}

export function Navbar({ userEmail }: NavbarProps) {
  const pathname = usePathname()

  if (pathname.startsWith("/auth")) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-foreground text-background text-[11px] font-bold tracking-widest select-none transition-opacity group-hover:opacity-80">
            GC
          </div>
          <span className="font-semibold tracking-tight text-sm">GameChanger</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-0.5">
            <Link
              href="/"
              className={cn(
                "relative px-4 py-2 text-sm rounded-md transition-colors",
                pathname === "/"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Home
              {pathname === "/" && (
                <span className="absolute bottom-0 left-4 right-4 h-px bg-foreground rounded-full" />
              )}
            </Link>
            <Link
              href="/todos"
              className={cn(
                "relative px-4 py-2 text-sm rounded-md transition-colors",
                pathname === "/todos"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Tasks
              {pathname === "/todos" && (
                <span className="absolute bottom-0 left-4 right-4 h-px bg-foreground rounded-full" />
              )}
            </Link>
            <Link
              href="/about"
              className={cn(
                "relative px-4 py-2 text-sm rounded-md transition-colors",
                pathname === "/about"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              About
              {pathname === "/about" && (
                <span className="absolute bottom-0 left-4 right-4 h-px bg-foreground rounded-full" />
              )}
            </Link>
          </nav>

          {userEmail && (
            <div className="flex items-center gap-2 pl-3 ml-1 border-l border-border">
              <span className="hidden sm:block text-xs text-muted-foreground truncate max-w-[140px]">
                {userEmail}
              </span>
              <form action={logout}>
                <Button variant="ghost" size="sm" type="submit" className="text-xs h-8 px-3">
                  Sign out
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
