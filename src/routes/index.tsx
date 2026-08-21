import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  Building2,
  Layers,
  MapPin,
  Search,
  Sparkles,
  Tag,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import materialsImg from "@/assets/materials.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buildohub — Procurement for Construction Materials" },
      {
        name: "description",
        content:
          "Live prices, verified suppliers and tracked deliveries. One quiet place to procure cement, steel and aggregates across India.",
      },
      { property: "og:title", content: "Buildohub — Procurement, refined" },
      {
        property: "og:description",
        content:
          "Live prices, verified suppliers and tracked deliveries for construction materials across India.",
      },
    ],
  }),
  component: Index,
});

const ticker = [
  ["TMT Bar Fe-500D", "₹62,400", "+1.2%"],
  ["OPC Cement 53G", "₹380", "-0.5%"],
  ["River Sand", "₹1,800", "+0.8%"],
  ["AAC Blocks", "₹3,200", "+1.1%"],
  ["Structural Steel", "₹58,000", "-0.3%"],
  ["Binding Wire", "₹72,000", "+2.1%"],
  ["MS Pipe", "₹68,000", "-0.7%"],
  ["Plywood 18mm", "₹92", "+1.3%"],
];

const whyChooseUs = {
  buyer: [
    {
      icon: Tag,
      title: "Get lower price",
      body: "Benchmark live rates across verified suppliers and secure quotes at least 1% below prevailing market prices.",
    },
    {
      icon: Sparkles,
      title: "AI Assisted Orders",
      body: "Let our engine recommend the right grade, quantity and reorder point based on your project schedule and burn rate.",
    },
    {
      icon: BarChart3,
      title: "Comprehensive reports",
      body: "Track spend, price variance, supplier performance and site-wise consumption in one clean dashboard.",
    },
    {
      icon: Building2,
      title: "Multibrand / Multicity",
      body: "Source cement, steel, aggregates and finishes from multiple brands, delivered to any site across India.",
    },
  ],
  supplier: [
    {
      icon: Users,
      title: "Get verified buyers",
      body: "Access a curated network of contractors and developers actively buying construction materials every day.",
    },
    {
      icon: Wallet,
      title: "Get paid faster",
      body: "Reduce working-capital stress with predictable payment cycles and invoice financing built for suppliers.",
    },
    {
      icon: MapPin,
      title: "Pan India & Global",
      body: "Expand beyond your local market with logistics and fulfillment support across India and select export corridors.",
    },
    {
      icon: Layers,
      title: "Multi Brand SKUs",
      body: "List your full catalogue — TMT, cement, blocks, sand, plywood and more — in one integrated marketplace.",
    },
  ],
};

function Index() {
  return (
    <main className="overflow-x-hidden">
      {/* Nav — deliberately minimal */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/30 bg-background/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5 md:gap-8 md:px-10">
          <span className="font-display text-2xl tracking-tight">Buildohub</span>
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative hidden flex-1 md:block"
          >
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              aria-label="Search materials, suppliers or grades"
              placeholder="Search cement, TMT bars, aggregates, suppliers…"
              className="w-full rounded-full border border-border/70 bg-background/40 py-2.5 pl-11 pr-4 text-sm outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60"
            />
          </form>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a
              href="#enquire"
              className="hidden rounded-full border border-border/80 bg-background/40 px-5 py-2 text-sm backdrop-blur-md transition-colors hover:bg-accent sm:inline-flex"
            >
              Request access
            </a>
            <a
              href="#enquire"
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Quote
            </a>
          </div>
        </div>
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="relative px-6 pb-4 md:hidden"
        >
          <Search
            aria-hidden
            className="pointer-events-none absolute left-10 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            aria-label="Search materials, suppliers or grades"
            placeholder="Search materials or suppliers…"
            className="w-full rounded-full border border-border/70 bg-background/40 py-2.5 pl-11 pr-4 text-sm outline-none backdrop-blur-md placeholder:text-muted-foreground/70 focus:border-primary/60"
          />
        </form>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Steel frame of a building under construction at golden hour"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--background) 8%, transparent 55%), var(--gradient-warm)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          <p className="rise mb-8 text-xs uppercase tracking-[0.35em] text-primary">
            Materials · India
          </p>
          <h1 className="rise max-w-4xl text-[clamp(2.75rem,8vw,7rem)] leading-[0.95]">
            Procurement, <em className="italic text-primary">quietly</em> perfected.
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Transparent prices, verified suppliers and deliveries you can watch arrive — for
              every material your site runs on.
            </p>
            <a
              href="#enquire"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm text-primary-foreground transition-transform duration-500 hover:translate-x-1"
            >
              Get Quote <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Price ticker */}
      <section className="border-y border-border/60 py-5">
        <div className="flex w-max marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {ticker.map(([name, price, delta]) => (
                <span
                  key={`${dup}-${name}`}
                  className="flex items-baseline gap-3 whitespace-nowrap px-8 text-sm"
                >
                  <span className="text-muted-foreground">{name}</span>
                  <span>{price}</span>
                  <span className="text-xs text-primary">{delta}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05]">
          Three movements, from enquiry to gate entry.
        </h2>
        <div className="mt-20 grid gap-px overflow-hidden rounded-4xl border border-border/60 bg-border/60 md:grid-cols-3">
          {chapters.map((c) => (
            <article
              key={c.n}
              className="group bg-background p-10 transition-colors duration-500 hover:bg-card md:p-12"
            >
              <span className="text-xs tracking-[0.3em] text-primary">{c.n}</span>
              <h3 className="mt-8 text-3xl">{c.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Editorial split */}
      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10 md:pb-40">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="overflow-hidden rounded-4xl">
            <img
              src={materialsImg}
              alt="Stacked cement bags and steel rebar"
              width={1200}
              height={1504}
              loading="lazy"
              className="h-[32rem] w-full object-cover transition-transform duration-[1200ms] hover:scale-105 md:h-[40rem]"
            />
          </div>
          <div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
              Every grade, every load, accounted for.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Cement, TMT, aggregates, blocks, formwork and finishes — sourced from suppliers we
              audit, priced at the rate you were quoted, delivered on the day you were promised.
            </p>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
              {[
                ["1,200+", "Verified suppliers"],
                ["48 hrs", "Median delivery"],
                ["₹0", "Platform fee"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-3xl text-primary">{k}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section id="enquire" className="bg-cream text-cream-foreground">
        <div className="mx-auto max-w-7xl px-6 py-28 text-center md:px-10 md:py-40">
          <h2 className="mx-auto max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1]">
            Tell us what your site needs this week.
          </h2>
          <form
            className="mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Work email"
              aria-label="Work email"
              className="flex-1 rounded-full border border-cream-foreground/20 bg-transparent px-6 py-4 text-sm outline-none placeholder:text-cream-foreground/50 focus:border-cream-foreground/50"
            />
            <button
              type="submit"
              className="rounded-full bg-cream-foreground px-8 py-4 text-sm text-cream transition-opacity hover:opacity-85"
            >
              Request access
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <span className="font-display text-2xl text-foreground">Buildohub</span>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A procurement platform for construction materials — transparent prices, verified
                suppliers and deliveries tracked to site.
              </p>
              <address className="mt-6 space-y-1 text-sm not-italic text-muted-foreground">
                <div>Buildohub Technologies Pvt. Ltd.</div>
                <div>Indiranagar, Bengaluru, Karnataka 560038</div>
                <div>
                  <a href="tel:+918000000000" className="hover:text-foreground">
                    +91 80000 00000
                  </a>
                </div>
                <div>
                  <a href="mailto:hello@buildohub.in" className="hover:text-foreground">
                    hello@buildohub.in
                  </a>
                </div>
              </address>
            </div>

            {[
              {
                title: "Materials",
                links: ["Cement", "TMT & Steel", "Aggregates & Sand", "AAC Blocks", "Plywood"],
              },
              {
                title: "Company",
                links: ["About us", "Careers", "Newsroom", "Contact us", "Investors"],
              },
              {
                title: "Resources",
                links: [
                  "Price index",
                  "Supplier onboarding",
                  "Help centre",
                  "Privacy policy",
                  "Terms of use",
                ],
              },
            ].map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-semibold tracking-wide text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#enquire" className="transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row">
            <span>© {new Date().getFullYear()} Buildohub · Bengaluru, India</span>
            <span>CIN: U74999KA2026PTC000000 · GSTIN: 29AAACB0000A1Z5</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
