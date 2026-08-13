import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Buildohub Procurement Desk" },
      {
        name: "description",
        content:
          "Track outstanding orders, watchlist prices, spend reports and browse materials from one quiet procurement desk.",
      },
      { property: "og:title", content: "Buildohub — Procurement Desk" },
      {
        property: "og:description",
        content: "Outstanding orders, watchlist, reports and materials in a single view.",
      },
    ],
  }),
  component: Dashboard,
});

const recentOrders = [
  { id: "BH-4821", item: "TMT Fe-500D · 12mm", qty: "18 T", value: "₹11,23,200", state: "In transit" },
  { id: "BH-4814", item: "OPC 53G Cement", qty: "600 bags", value: "₹2,28,000", state: "Delivered" },
  { id: "BH-4802", item: "M-Sand (Zone II)", qty: "40 cum", value: "₹72,000", state: "At weighbridge" },
  { id: "BH-4791", item: "AAC Blocks 600×200", qty: "1,100 nos", value: "₹3,52,000", state: "Delivered" },
  { id: "BH-4780", item: "MS Pipe 50NB", qty: "4.2 T", value: "₹2,85,600", state: "Dispatched" },
];

const suggestions = [
  { item: "Binding Wire 18G", why: "Reordered every 3 weeks · due now", move: "₹72,000/T", delta: "+2.1%" },
  { item: "Shuttering Ply 18mm", why: "Pairs with your slab schedule", move: "₹92/sqft", delta: "+1.3%" },
  { item: "Fly Ash Bricks", why: "12% under your last landed rate", move: "₹6.4/nos", delta: "-1.8%" },
  { item: "TMT Fe-550D · 16mm", why: "Grade upgrade, same lead time", move: "₹64,100/T", delta: "+0.6%" },
  { item: "Curing Compound", why: "Watchlist supplier cut price", move: "₹210/L", delta: "-3.4%" },
];

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

function Dashboard() {
  const [panel, setPanel] = useState(0);
  const [fade, setFade] = useState(true);
  const [view, setView] = useState<View>("Outstanding");

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPanel((p) => (p === 0 ? 1 : 0));
        setFade(true);
      }, 420);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-warm)" }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[110rem] flex-col px-6 py-6 md:px-10 md:py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-2xl tracking-tight">Buildohub</span>
            <span className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground sm:inline">
              Procurement desk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground md:inline">Thursday, 13 August</span>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card font-display text-sm">
              RK
            </span>
          </div>
        </header>

        <div className="mt-8 grid flex-1 gap-6 lg:grid-cols-[22rem_1fr]">
          {/* Dynamic left rail */}
          <aside className="flex flex-col rounded-4xl border border-border/60 bg-card/70 p-7 backdrop-blur-xl"
            style={{ boxShadow: "var(--shadow-lift)" }}>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                {panel === 0 ? "Recent orders" : "For your sites"}
              </span>
              <span className="flex gap-1.5" aria-hidden>
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    onClick={() => setPanel(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      panel === i ? "w-6 bg-primary" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </span>
            </div>

            <div
              className={`mt-7 flex-1 transition-all duration-500 ${
                fade ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              {panel === 0 ? (
                <ul className="space-y-5">
                  {recentOrders.map((o) => (
                    <li key={o.id} className="border-b border-border/50 pb-5 last:border-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm">{o.item}</span>
                        <span className="whitespace-nowrap font-display text-lg text-primary">
                          {o.value}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{o.id}</span>
                        <span aria-hidden>·</span>
                        <span>{o.qty}</span>
                        <span aria-hidden>·</span>
                        <span className="text-foreground/70">{o.state}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-5">
                  {suggestions.map((s) => (
                    <li key={s.item} className="border-b border-border/50 pb-5 last:border-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm">{s.item}</span>
                        <span className="whitespace-nowrap text-xs text-primary">{s.delta}</span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.why}</p>
                      <p className="mt-1 font-display text-lg">{s.move}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              {panel === 0 ? "Last five orders across your sites." : "Suggested by your buying pattern."}
            </p>
          </aside>

          {/* Center switchable area */}
          <section className="flex flex-col rounded-4xl border border-border/60 bg-background/40 p-7 backdrop-blur-xl md:p-10">
            <nav className="flex flex-wrap gap-2">
              {views.map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-full border px-5 py-2 text-sm transition-colors duration-300 ${
                    view === v
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/70 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </nav>

            <div key={view} className="rise mt-8 flex-1">
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
                <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-2">
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
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
                <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-2 xl:grid-cols-3">
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
      </div>
    </main>
  );
}
