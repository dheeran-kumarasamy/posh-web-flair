import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/newdashboard")({
  head: () => ({
    meta: [
      { title: "Buildohub — Procurement Desk" },
      {
        name: "description",
        content:
          "A unified, full-screen view of outstanding orders, watchlist prices, reports and materials.",
      },
      { property: "og:title", content: "Buildohub — Procurement Desk" },
      {
        property: "og:description",
        content: "Outstanding orders, watchlist, reports and materials in one view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewDashboard,
});

const views = ["Outstanding", "Watchlist", "Reports", "Browse"] as const;
type View = (typeof views)[number];

const outstanding = [
  ["BH-4821", "TMT Fe-500D · 12mm", "Shree Steels", "14 Aug", "₹11,23,200", "In transit"],
  ["BH-4802", "M-Sand (Zone II)", "Kaveri Aggregates", "13 Aug", "₹72,000", "At weighbridge"],
  ["BH-4780", "MS Pipe 50NB", "Nandi Tubes", "16 Aug", "₹2,85,600", "Dispatched"],
  ["BH-4776", "Formwork Ply", "Anand Timber", "18 Aug", "₹1,48,400", "Confirmed"],
];

const watchlist = [
  ["OPC Cement 53G", "₹380 / bag", "-0.5%", "Below your target of ₹390"],
  ["TMT Bar Fe-500D", "₹62,400 / T", "+1.2%", "3 suppliers quoting"],
  ["River Sand", "₹1,800 / cum", "+0.8%", "Monsoon premium easing"],
  ["Structural Steel", "₹58,000 / T", "-0.3%", "Stable for 9 days"],
];

const reports = [
  ["Spend this month", "₹48.6 L", "-6% vs July"],
  ["On-time delivery", "94%", "+3 pts"],
  ["Avg. lead time", "41 hrs", "-7 hrs"],
  ["Savings captured", "₹3.2 L", "vs quoted rate"],
];

const browse = [
  ["Cement", "18 grades"],
  ["Steel & TMT", "42 SKUs"],
  ["Aggregates", "11 grades"],
  ["Blocks & Bricks", "26 SKUs"],
  ["Formwork", "14 SKUs"],
  ["Finishes", "60+ SKUs"],
];

function NewDashboard() {
  const [view, setView] = useState<View>("Outstanding");

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-warm)" }}
      />

      <div className="relative flex flex-1 flex-col px-6 py-6 md:px-10 md:py-8">
        <nav className="flex flex-wrap items-center gap-2">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                view === v
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 bg-background/30 text-muted-foreground backdrop-blur-sm hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </nav>

        <section
          key={view}
          className="rise mt-6 flex flex-1 flex-col rounded-4xl border border-border/60 bg-background/40 p-6 backdrop-blur-xl md:p-10"
        >
          <header className="mb-6 flex items-baseline justify-between">
            <h1 className="font-display text-3xl tracking-tight md:text-4xl">{view}</h1>
            <span className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground md:inline">
              Procurement desk
            </span>
          </header>

          <div className="flex-1">
            {view === "Outstanding" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <tr>
                      {["Order", "Material", "Supplier", "ETA", "Value", "Status"].map((h) => (
                        <th key={h} className="border-b border-border/60 pb-3 pr-6 font-normal">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {outstanding.map((r) => (
                      <tr key={r[0]} className="transition-colors hover:bg-card/60">
                        <td className="border-b border-border/40 py-4 pr-6 text-muted-foreground">{r[0]}</td>
                        <td className="border-b border-border/40 py-4 pr-6">{r[1]}</td>
                        <td className="border-b border-border/40 py-4 pr-6 text-muted-foreground">{r[2]}</td>
                        <td className="border-b border-border/40 py-4 pr-6">{r[3]}</td>
                        <td className="border-b border-border/40 py-4 pr-6 font-display text-lg text-primary">
                          {r[4]}
                        </td>
                        <td className="border-b border-border/40 py-4 text-muted-foreground">{r[5]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {view === "Watchlist" && (
              <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
                {watchlist.map((w) => (
                  <article key={w[0]} className="bg-background p-7 transition-colors hover:bg-card">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xl">{w[0]}</h3>
                      <span className="text-xs text-primary">{w[2]}</span>
                    </div>
                    <p className="mt-3 font-display text-3xl">{w[1]}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{w[3]}</p>
                  </article>
                ))}
              </div>
            )}

            {view === "Reports" && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {reports.map((r) => (
                  <div key={r[0]} className="rounded-3xl border border-border/60 bg-card/60 p-7">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{r[0]}</p>
                    <p className="mt-5 font-display text-4xl text-primary">{r[1]}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{r[2]}</p>
                  </div>
                ))}
              </div>
            )}

            {view === "Browse" && (
              <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
                {browse.map((b) => (
                  <button
                    key={b[0]}
                    className="group bg-background p-8 text-left transition-colors hover:bg-card"
                  >
                    <h3 className="text-2xl">{b[0]}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b[1]}</p>
                    <span className="mt-6 inline-block text-sm text-primary transition-transform duration-500 group-hover:translate-x-1">
                      Browse →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
