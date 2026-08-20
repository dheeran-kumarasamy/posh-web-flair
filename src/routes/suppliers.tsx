import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/suppliers")({
  head: () => ({
    meta: [
      { title: "Supplier Comparison — Buildohub" },
      {
        name: "description",
        content:
          "Compare delivered price, lead time, reliability and verification to decide who should supply your requirement.",
      },
      { property: "og:title", content: "Buildohub — Supplier comparison" },
      {
        property: "og:description",
        content: "A recommendation and a clean comparison table for every requirement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Suppliers,
});

const suppliers = [
  ["Shree Steels", "₹62,180 / T", "38 hrs", "96%", "Verified", "9.2"],
  ["Nandi Metals", "₹61,940 / T", "56 hrs", "91%", "Verified", "8.7"],
  ["Kaveri Steel Co.", "₹62,600 / T", "24 hrs", "88%", "Verified", "8.4"],
  ["Sathya Iron Works", "₹63,050 / T", "30 hrs", "84%", "Unverified", "7.6"],
];

function Suppliers() {
  return (
    <AppShell>
      <PageHeader
        title="Suppliers"
        subtitle="10 tonnes · TMT Fe-500D 12mm · Whitefield, Bengaluru"
      />

      <section className="rounded-xl border border-border bg-card p-7 md:p-9">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Best overall option
        </p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Shree Steels</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Best balance of delivered price, lead time and delivery reliability for this
              requirement.
            </p>
          </div>
          <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Request quote
          </button>
        </div>
        <dl className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-4">
          {[
            ["Delivered price", "₹62,180 / T"],
            ["Lead time", "38 hrs"],
            ["Reliability", "96% on-time"],
            ["Overall score", "9.2 / 10"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="tnum mt-1 text-lg font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-semibold">All quoting suppliers</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[42rem] text-sm">
            <thead>
              <tr className="text-left text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                {["Supplier", "Delivered price", "Lead time", "On-time", "Status", "Score"].map(
                  (h, i) => (
                    <th key={h} className={`pb-2 font-medium ${i > 0 ? "text-right" : ""}`}>
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s[0]} className="border-t border-border transition-colors hover:bg-secondary">
                  <td className="py-3.5 font-medium">{s[0]}</td>
                  <td className="tnum py-3.5 text-right">{s[1]}</td>
                  <td className="tnum py-3.5 text-right">{s[2]}</td>
                  <td className="tnum py-3.5 text-right">{s[3]}</td>
                  <td className="py-3.5 text-right text-muted-foreground">{s[4]}</td>
                  <td className="tnum py-3.5 text-right font-medium">{s[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
