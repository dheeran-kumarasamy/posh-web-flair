import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Delta, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Buildohub Procurement" },
      {
        name: "description",
        content:
          "Your procurement snapshot: active value, today's material market and everything that needs attention.",
      },
      { property: "og:title", content: "Buildohub Dashboard" },
      {
        property: "og:description",
        content: "Procurement snapshot, live material market and open actions in one calm view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const market: [string, string, string][] = [
  ["TMT Steel Fe-500D", "₹62,400 / T", "+1.2%"],
  ["OPC Cement 53G", "₹380 / bag", "-0.5%"],
  ["River Sand", "₹1,800 / cum", "+0.8%"],
  ["AAC Blocks", "₹3,200 / cum", "-0.4%"],
];

const attention: [string, string, string][] = [
  ["Quotes awaiting review", "3 suppliers quoted TMT Fe-500D for Whitefield", "Review"],
  ["Price movement", "Cement is 2.4% below your target of ₹390", "See intelligence"],
  ["Delivery today", "BH-4802 · M-Sand at weighbridge, Hebbal", "Track"],
  ["Supplier response", "Nandi Tubes revised lead time to 44 hrs", "Open"],
];

function Dashboard() {
  return (
    <AppShell>
      <PageHeader
        title="Good morning, Rahul"
        subtitle="Here's what's happening with your procurement."
      />

      <section className="rounded-xl border border-border bg-card p-7 md:p-9">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Procurement snapshot
        </p>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          <div>
            <p className="tnum text-4xl font-semibold tracking-tight text-primary">₹3.2 L</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Potential savings across open sourcing this week
            </p>
          </div>
          <div>
            <p className="tnum text-4xl font-semibold tracking-tight">₹48.6 L</p>
            <p className="mt-2 text-sm text-muted-foreground">Active procurement value</p>
          </div>
          <div>
            <p className="tnum text-4xl font-semibold tracking-tight">6</p>
            <p className="mt-2 text-sm text-muted-foreground">Open sourcing opportunities</p>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold">Market today</h2>
            <Link to="/prices" className="text-sm text-primary hover:underline">
              View price intelligence →
            </Link>
          </div>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-2 font-medium">Material</th>
                <th className="pb-2 text-right font-medium">Current price</th>
                <th className="pb-2 text-right font-medium">Movement</th>
              </tr>
            </thead>
            <tbody>
              {market.map(([name, price, delta]) => (
                <tr key={name} className="border-t border-border">
                  <td className="py-3.5">{name}</td>
                  <td className="tnum py-3.5 text-right">{price}</td>
                  <td className="py-3.5 text-right">
                    <Delta value={delta} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-base font-semibold">Requires attention</h2>
          <ul className="mt-4">
            {attention.map(([title, body, action]) => (
              <li
                key={title}
                className="flex items-start justify-between gap-6 border-t border-border py-4"
              >
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
                <button className="shrink-0 text-sm text-primary hover:underline">{action}</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
