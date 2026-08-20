import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, ShoppingCart } from "lucide-react";
import type { ReactNode } from "react";

const nav: { group: string; items: { label: string; to: string }[] }[] = [
  { group: "Overview", items: [{ label: "Dashboard", to: "/dashboard" }] },
  {
    group: "Procurement",
    items: [
      { label: "Materials", to: "/materials" },
      { label: "Suppliers", to: "/suppliers" },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { label: "Prices", to: "/prices" },
      { label: "Reports", to: "/reports" },
    ],
  },
  { group: "Operations", items: [{ label: "Orders", to: "/newdashboard" }] },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="portal min-h-screen">
      <div className="mx-auto flex w-full max-w-[110rem]">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border px-5 py-6 lg:flex">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Buildo<span className="text-primary">hub</span>
          </Link>

          <nav className="mt-9 space-y-7">
            {nav.map((g) => (
              <div key={g.group}>
                <p className="px-3 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {g.group}
                </p>
                <ul className="mt-2 space-y-0.5">
                  {g.items.map((i) => {
                    const active = pathname === i.to;
                    return (
                      <li key={i.to}>
                        <Link
                          to={i.to}
                          className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                            active
                              ? "bg-accent font-medium text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {i.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-auto border-t border-border pt-4">
            <p className="px-3 text-sm text-muted-foreground">Settings</p>
            <p className="px-3 pt-2 text-sm text-muted-foreground">Profile</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
            <div className="flex items-center gap-3 px-5 py-3.5 md:px-8">
              <Link to="/" className="text-base font-semibold tracking-tight lg:hidden">
                Buildo<span className="text-primary">hub</span>
              </Link>
              <form
                role="search"
                onSubmit={(e) => e.preventDefault()}
                className="relative hidden min-w-0 flex-1 md:block md:max-w-md"
              >
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="search"
                  aria-label="Search materials, suppliers, prices or reports"
                  placeholder="Search materials, suppliers, prices or reports…"
                  className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                />
              </form>
              <div className="ml-auto flex items-center gap-1">
                <button
                  aria-label="Alerts"
                  className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
                </button>
                <button
                  aria-label="Cart"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <ShoppingCart className="size-4" />
                </button>
                <span className="ml-2 grid size-8 place-items-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  RK
                </span>
              </div>
            </div>

            <nav className="flex gap-1 overflow-x-auto px-4 pb-2 lg:hidden">
              {nav.flatMap((g) => g.items).map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm ${
                    pathname === i.to
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </header>

          <main className="flex-1 px-5 py-8 md:px-8 md:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">{title}</h1>
        {subtitle ? <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Delta({ value }: { value: string }) {
  const down = value.trim().startsWith("-");
  return (
    <span className={`tnum text-sm ${down ? "text-success" : "text-danger"}`}>
      {down ? "↓" : "↑"} {value.replace(/^[+-]/, "")}
    </span>
  );
}