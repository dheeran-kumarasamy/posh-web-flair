import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Buildohub Procurement" },
      {
        name: "description",
        content:
          "Open any Buildohub procurement report — spend, orders, suppliers, GST and site-wise detail — as a single expanding overlay.",
      },
      { property: "og:title", content: "Buildohub — Reports" },
      {
        property: "og:description",
        content: "Spend, orders, suppliers, GST and site-wise procurement reports in one quiet view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reports,
});

type Table = { head: string[]; rows: string[][] };
type Report = { id: string; name: string; table: Table; footer?: string };

const reports: Report[] = [
  {
    id: "spend",
    name: "Spend Summary",
    table: {
      head: ["Period", "Orders", "Value", "Vs previous"],
      rows: [
        ["August 2026", "34", "₹48,62,400", "-6%"],
        ["July 2026", "39", "₹51,74,900", "+4%"],
        ["June 2026", "31", "₹49,80,100", "-2%"],
        ["May 2026", "28", "₹50,92,600", "+9%"],
      ],
    },
    footer: "Rolling four-month procurement spend across all sites.",
  },
  {
    id: "orders",
    name: "Order Register",
    table: {
      head: ["Order", "Material", "Supplier", "Value", "Status"],
      rows: [
        ["BH-4821", "TMT Fe-500D · 12mm", "Shree Steels", "₹11,23,200", "In transit"],
        ["BH-4814", "OPC 53G Cement", "Deccan Cements", "₹2,28,000", "Delivered"],
        ["BH-4802", "M-Sand (Zone II)", "Kaveri Aggregates", "₹72,000", "At weighbridge"],
        ["BH-4791", "AAC Blocks 600×200", "Bluestone Blocks", "₹3,52,000", "Delivered"],
        ["BH-4780", "MS Pipe 50NB", "Nandi Tubes", "₹2,85,600", "Dispatched"],
      ],
    },
  },
  {
    id: "suppliers",
    name: "Supplier Performance",
    table: {
      head: ["Supplier", "Orders", "On-time", "Avg. lead", "Rating"],
      rows: [
        ["Shree Steels", "14", "96%", "38 hrs", "4.8"],
        ["Deccan Cements", "21", "93%", "26 hrs", "4.6"],
        ["Kaveri Aggregates", "9", "88%", "19 hrs", "4.2"],
        ["Nandi Tubes", "6", "91%", "44 hrs", "4.4"],
      ],
    },
  },
  {
    id: "materials",
    name: "Material Consumption",
    table: {
      head: ["Material", "Quantity", "Value", "Share"],
      rows: [
        ["TMT & Structural Steel", "112 T", "₹69,84,000", "41%"],
        ["Cement", "4,200 bags", "₹15,96,000", "19%"],
        ["Aggregates & Sand", "620 cum", "₹11,16,000", "13%"],
        ["Blocks & Bricks", "18,400 nos", "₹9,42,000", "11%"],
        ["Formwork & Finishes", "—", "₹13,22,000", "16%"],
      ],
    },
  },
  {
    id: "price",
    name: "Price Trend",
    table: {
      head: ["Material", "Current", "30-day", "90-day"],
      rows: [
        ["OPC Cement 53G", "₹380 / bag", "-0.5%", "-2.4%"],
        ["TMT Bar Fe-500D", "₹62,400 / T", "+1.2%", "+4.1%"],
        ["River Sand", "₹1,800 / cum", "+0.8%", "+6.3%"],
        ["Structural Steel", "₹58,000 / T", "-0.3%", "+1.7%"],
      ],
    },
  },
  {
    id: "gst",
    name: "GST & Invoices",
    table: {
      head: ["Invoice", "Supplier", "Taxable", "GST", "Total"],
      rows: [
        ["INV-2291", "Shree Steels", "₹9,51,864", "₹1,71,336", "₹11,23,200"],
        ["INV-2288", "Deccan Cements", "₹1,93,220", "₹34,780", "₹2,28,000"],
        ["INV-2274", "Kaveri Aggregates", "₹64,286", "₹7,714", "₹72,000"],
        ["INV-2260", "Nandi Tubes", "₹2,42,034", "₹43,566", "₹2,85,600"],
      ],
    },
    footer: "Input credit reconciled up to 12 August 2026.",
  },
  {
    id: "payments",
    name: "Payments & Dues",
    table: {
      head: ["Supplier", "Outstanding", "Due date", "Ageing"],
      rows: [
        ["Shree Steels", "₹11,23,200", "28 Aug", "0–30 days"],
        ["Anand Timber", "₹1,48,400", "21 Aug", "0–30 days"],
        ["Nandi Tubes", "₹2,85,600", "14 Aug", "31–60 days"],
        ["Bluestone Blocks", "₹0", "—", "Cleared"],
      ],
    },
  },
];

const siteWise = [
  {
    site: "Whitefield Tower A",
    code: "SITE-01",
    budget: "₹2.40 Cr",
    spent: "₹1,86,40,000",
    used: "78%",
    orders: 14,
    lines: [
      ["TMT Fe-500D", "48 T", "₹29,95,200", "Shree Steels"],
      ["OPC 53G Cement", "1,800 bags", "₹6,84,000", "Deccan Cements"],
      ["M-Sand (Zone II)", "220 cum", "₹3,96,000", "Kaveri Aggregates"],
      ["AAC Blocks", "7,400 nos", "₹4,73,600", "Bluestone Blocks"],
    ],
  },
  {
    site: "Hebbal Riverside",
    code: "SITE-02",
    budget: "₹1.75 Cr",
    spent: "₹1,12,80,000",
    used: "64%",
    orders: 11,
    lines: [
      ["Structural Steel", "34 T", "₹19,72,000", "Shree Steels"],
      ["MS Pipe 50NB", "8.4 T", "₹5,71,200", "Nandi Tubes"],
      ["Formwork Ply 18mm", "620 sheets", "₹4,21,600", "Anand Timber"],
      ["Fly Ash Bricks", "22,000 nos", "₹1,40,800", "Bluestone Blocks"],
    ],
  },
  {
    site: "Sarjapur Villas",
    code: "SITE-03",
    budget: "₹96.00 L",
    spent: "₹41,20,000",
    used: "43%",
    orders: 7,
    lines: [
      ["OPC 53G Cement", "900 bags", "₹3,42,000", "Deccan Cements"],
      ["River Sand", "140 cum", "₹2,52,000", "Kaveri Aggregates"],
      ["Curing Compound", "480 L", "₹1,00,800", "Chemcoat"],
      ["Binding Wire 18G", "1.2 T", "₹86,400", "Shree Steels"],
    ],
  },
];

function Reports() {
  const [open, setOpen] = useState<string | null>(null);
  const [site, setSite] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = reports.find((r) => r.id === open);
  const s = siteWise[site] ?? siteWise[0]!;

  return (
    <main className="relative flex h-screen flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-warm)" }}
      />

      <div className="relative flex flex-1 flex-col px-6 py-6 md:px-10 md:py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Buildo<span className="text-primary">hub</span>
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground md:inline">
            Procurement desk
          </span>
        </div>

        <section className="rise flex flex-1 flex-col rounded-4xl border border-border/60 bg-background/40 p-6 backdrop-blur-xl md:p-10">
          <header className="mb-8 flex items-baseline justify-between">
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Reports</h1>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {reports.length + 1} views
            </span>
          </header>

          <div className="grid flex-1 content-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reports.map((r) => (
              <button
                key={r.id}
                onClick={() => setOpen(r.id)}
                className="rounded-3xl border border-border/60 bg-card/60 px-6 py-7 text-left font-display text-xl font-semibold leading-tight backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                style={{ boxShadow: "var(--shadow-lift)" }}
              >
                {r.name}
              </button>
            ))}

            <button
              onClick={() => setOpen("site-wise")}
              className="rounded-3xl border border-primary/70 bg-primary/10 px-6 py-7 text-left font-display text-xl font-semibold leading-tight text-primary backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              style={{ boxShadow: "var(--shadow-lift)" }}
            >
              Site-wise Report
            </button>
          </div>
        </section>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-md md:p-10"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="rise flex max-h-full w-full max-w-5xl flex-col rounded-4xl border border-border/60 bg-card/90 p-7 backdrop-blur-xl md:p-10"
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            <div className="flex items-start justify-between gap-6">
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {active ? active.name : "Site-wise Report"}
              </h2>
              <button
                aria-label="Close report"
                onClick={() => setOpen(null)}
                className="rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {active ? (
              <>
                <div className="mt-8 overflow-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      <tr>
                        {active.table.head.map((h) => (
                          <th key={h} className="border-b border-border/60 pb-3 pr-6 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {active.table.rows.map((row) => (
                        <tr key={row[0]} className="transition-colors hover:bg-background/40">
                          {row.map((c, i) => (
                            <td
                              key={i}
                              className={`border-b border-border/40 py-3.5 pr-6 ${
                                i === 0 ? "font-medium" : "text-muted-foreground"
                              }`}
                            >
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {active.footer && (
                  <p className="mt-6 text-xs font-medium text-muted-foreground">{active.footer}</p>
                )}
              </>
            ) : (
              <div className="mt-6 flex min-h-0 flex-1 flex-col">
                <nav className="flex flex-wrap gap-2">
                  {siteWise.map((x, i) => (
                    <button
                      key={x.code}
                      onClick={() => setSite(i)}
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                        i === site
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/70 bg-background/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {x.site}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  {[
                    ["Budget", s.budget],
                    ["Spent to date", s.spent],
                    ["Budget used", s.used],
                    ["Orders", String(s.orders)],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-3xl border border-border/60 bg-background/40 p-5">
                      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                        {k}
                      </p>
                      <p className="mt-3 font-display text-2xl font-semibold text-primary">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 min-h-0 flex-1 overflow-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      <tr>
                        {["Material", "Quantity", "Value", "Supplier"].map((h) => (
                          <th key={h} className="border-b border-border/60 pb-3 pr-6 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.lines.map((l) => (
                        <tr key={l[0]} className="transition-colors hover:bg-background/40">
                          <td className="border-b border-border/40 py-3.5 pr-6 font-medium">{l[0]}</td>
                          <td className="border-b border-border/40 py-3.5 pr-6 text-muted-foreground">{l[1]}</td>
                          <td className="border-b border-border/40 py-3.5 pr-6 font-display text-base font-semibold text-primary">
                            {l[2]}
                          </td>
                          <td className="border-b border-border/40 py-3.5 text-muted-foreground">{l[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
