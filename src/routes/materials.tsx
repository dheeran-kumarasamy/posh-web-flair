import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Source Materials — Buildohub" },
      {
        name: "description",
        content:
          "Tell Buildohub what your site needs and compare delivered price, lead time and reliability before you decide.",
      },
      { property: "og:title", content: "Buildohub — Source materials" },
      {
        property: "og:description",
        content: "Search, compare and decide on construction materials in one guided workflow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Materials,
});

const examples = ["10 tonnes Fe-500D TMT", "500 bags OPC Cement", "River sand for my project"];

const categories = [
  ["Cement", "OPC, PPC, PSC · 18 grades"],
  ["Steel & TMT", "Fe-500D, structural · 42 SKUs"],
  ["Aggregates", "M-sand, river sand, jelly"],
  ["Blocks & Bricks", "AAC, solid, clay"],
  ["Formwork", "Ply, props, accessories"],
  ["Finishes", "Putty, paint, tiles"],
];

function Materials() {
  const [query, setQuery] = useState("");

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl py-6 md:py-12">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">What do you need?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Describe the requirement in plain language — we'll identify the material and find who can
          deliver it.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="relative mt-7">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Describe what you need"
            placeholder="e.g. 10 tonnes Fe-500D TMT for Whitefield"
            className="w-full rounded-lg border border-border bg-card py-4 pl-11 pr-32 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Source
          </button>
        </form>

        <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => setQuery(e)}
              className="rounded-md px-2 py-1 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {e}
            </button>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-base font-semibold">Or start from a category</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {categories.map(([name, meta]) => (
              <li key={name}>
                <Link
                  to="/suppliers"
                  className="flex items-center justify-between gap-6 py-4 transition-colors hover:text-primary"
                >
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-sm text-muted-foreground">{meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
