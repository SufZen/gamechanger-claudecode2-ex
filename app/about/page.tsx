import Image from "next/image"

const quotes = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    role: "Management Consultant",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    role: "Co-founder, Apple",
  },
  {
    text: "We don't just build products. We build trust, one interaction at a time.",
    author: "Our Team",
    role: "GameChanger",
  },
]

export const metadata = {
  title: "About Us — GameChanger",
}

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Hero: split image + text */}
      <section className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left: image */}
        <div className="relative lg:w-2/5 h-72 lg:h-auto overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
            alt="Our team collaborating"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/15" />
          {/* Amber accent bar bottom-left */}
          <div className="absolute bottom-0 left-0 h-1 w-20 bg-amber-500" />
          {/* Subtle label on image */}
          <div className="absolute bottom-6 left-6">
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase">
              Est. 2024
            </span>
          </div>
        </div>

        {/* Right: content */}
        <div className="flex-1 flex items-center px-8 lg:px-20 py-16 lg:py-24">
          <div className="max-w-xl w-full">
            <span className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
              About Us
            </span>

            <h1 className="mt-5 text-4xl lg:text-[3.25rem] font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight">
              We build things
              <br />
              <em className="not-italic text-muted-foreground">that matter.</em>
            </h1>

            <div className="mt-1 h-px w-12 bg-amber-500" />

            <p className="mt-8 text-muted-foreground leading-relaxed text-[0.95rem]">
              Founded with a vision to transform how businesses operate, GameChanger brings
              together a team of passionate designers, engineers, and strategists who believe
              technology should serve people — not the other way around.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-[0.95rem]">
              From our first line of code to our latest product release, every decision we make
              is guided by one question:{" "}
              <em className="text-foreground not-italic font-medium">
                does this make someone&apos;s life better?
              </em>
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
              <div>
                <div className="text-2xl font-[family-name:var(--font-heading)] font-bold">12+</div>
                <div className="mt-1 text-xs text-muted-foreground tracking-wide">
                  Products shipped
                </div>
              </div>
              <div>
                <div className="text-2xl font-[family-name:var(--font-heading)] font-bold">40+</div>
                <div className="mt-1 text-xs text-muted-foreground tracking-wide">
                  Team members
                </div>
              </div>
              <div>
                <div className="text-2xl font-[family-name:var(--font-heading)] font-bold">98%</div>
                <div className="mt-1 text-xs text-muted-foreground tracking-wide">
                  Client retention
                </div>
              </div>
              <div>
                <div className="text-2xl font-[family-name:var(--font-heading)] font-bold">3</div>
                <div className="mt-1 text-xs text-muted-foreground tracking-wide">
                  Continents served
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="border-t border-border bg-muted/30 px-8 lg:px-20 py-20">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            Words We Live By
          </span>

          <div className="mt-10 grid md:grid-cols-3 gap-8 lg:gap-12">
            {quotes.map((quote, i) => (
              <blockquote
                key={i}
                className="relative pl-5 border-l-2 border-amber-500/60 hover:border-amber-500 transition-colors group"
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-3 text-6xl leading-none font-[family-name:var(--font-heading)] text-amber-500/15 group-hover:text-amber-500/25 transition-colors select-none"
                >
                  &ldquo;
                </span>
                <p className="text-[1.05rem] font-[family-name:var(--font-heading)] italic leading-relaxed text-foreground/85">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <footer className="mt-5">
                  <div className="text-sm font-semibold text-foreground">{quote.author}</div>
                  <div className="mt-0.5 text-xs font-mono text-muted-foreground tracking-wider uppercase">
                    {quote.role}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
