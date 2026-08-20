import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Delta } from "@/components/app-shell";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Price Intelligence — Buildohub" },
      {
        name: "description",
        content:
          "TMT Fe-500D price intelligence for Bengaluru: current rate, movement, forecast and a clear buying recommendation.",
      },
      { property: "og:title", content: "Buildohub — Price intelligence" },
      {
        property: "og:description",
        content: "What happened, why, what happens next and what you should do.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Prices,
});

const series = [58.2, 59.1, 58.6, 60.4, 61.2, 60.8, 62.0, 61.5, 62.9, 62.4, 61.8, 62.4];
const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

function Chart() {
  const min = Math.min(...series) - 1;
  const max = Math.max(...series) + 1;
  const pts = series.map((v, i) => {
    const x = (i / (series.length - 1)) * 100;
    const y = 100 - ((v - min) / (max - min)) * 100;
    return `${x},${y}`;
  });

  return (
    <div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-56 w-full md:h-72">
        <polyline
          points={`0,100 ${pts.join(" ")} 100,100`}
          fill="var(--accent)"
          stroke="none"
          opacity="0.7"
        />
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function Prices() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Price intelligence
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-[1.75rem]">
          TMT Steel Fe-500D
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Bengaluru Urban · Updated today, 09:40 IST
        </p>

        <div className="mt-8 flex flex-wrap items-end gap-x-12 gap-y-4">
          <div>
            <p className="tnum text-4xl font-semibold tracking-tight">₹62,400</p>
            <p className="mt-1 text-sm text-muted-foreground">per tonne, delivered</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">This week</p>
            <div className="mt-1">
              <Delta value="+1.2%" />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">This month</p>
            <div className="mt-1">
              <Delta value="-0.6%" />
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-xl border border-border bg-card p-6 md:p-8">
          <Chart />
        </section>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-base font-semibold">What happened</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Fe-500D moved up 1.2% this week after three flat weeks, ending August marginally
              below where it opened the month.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">Why</h2>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {[
                ["Billet input cost", "Up 2.1% on firmer sponge iron rates"],
                ["Regional supply", "Two Karnataka mills on maintenance shutdown"],
                ["Demand", "Pre-monsoon slab pours lifted local offtake"],
              ].map(([k, v]) => (
                <li key={k} className="flex flex-wrap justify-between gap-4 py-3.5 text-sm">
                  <span className="font-medium">{k}</span>
                  <span className="text-muted-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold">What happens next</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Expected range of ₹62,000–₹63,400 per tonne over the next 30 days, with mills likely
              to hold rates until shutdowns end.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Confidence: moderate</p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-base font-semibold">What you should do</h2>
            <p className="mt-2 text-lg">Consider purchasing within the next 7 days.</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Current delivered rates sit near the lower end of the forecast range, and the two
              mills returning from maintenance are unlikely to reduce prices before September.
            </p>
            <button className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Start sourcing
            </button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
