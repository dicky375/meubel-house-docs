interface RoadmapModule {
  name: string;
  desc: string;
  done?: boolean;
}

interface RoadmapPhase {
  title: string;
  status: 'done' | 'progress' | 'planned';
  modules: RoadmapModule[];
}

const phases: RoadmapPhase[] = [
  {
    title: 'Phase 1: Foundation',
    status: 'done',
    modules: [
      { name: 'Auth + Users', desc: 'JWT, refresh tokens, bcrypt, RBAC', done: true },
      { name: 'Categories', desc: 'CRUD with auto-slug generation', done: true },
      { name: 'Products', desc: 'CRUD, variants, filters, pagination', done: true },
    ],
  },
  {
    title: 'Phase 2: Commerce Core',
    status: 'progress',
    modules: [
      { name: 'Inventory', desc: 'Variant-level stock, audit trail', done: true },
      { name: 'Cart', desc: 'Server-side totals, price validation', done: false },
      { name: 'Orders', desc: 'Checkout, reservation, status flow', done: false },
      { name: 'Payments', desc: 'Provider abstraction, webhook verification', done: false },
    ],
  },
  {
    title: 'Phase 3: Multi-Channel',
    status: 'planned',
    modules: [
      { name: 'Sales', desc: 'In-store sales rep flow, walk-in customers', done: false },
      { name: 'Reviews', desc: 'Verified reviews on delivered purchases', done: false },
      { name: 'Promotions', desc: 'Discount codes, minimum orders, usage limits', done: false },
    ],
  },
  {
    title: 'Phase 4: Operations',
    status: 'planned',
    modules: [
      { name: 'Reports', desc: 'Admin analytics, sales, inventory, users', done: false },
      { name: 'Notifications', desc: 'Email, SMS, in-app alerts', done: false },
      { name: 'Audit Logs', desc: 'Every action by every user, queryable', done: false },
      { name: 'API Documentation', desc: 'OpenAPI, Swagger UI, this site', done: true },
    ],
  },
  {
    title: 'Phase 5: Production Polish',
    status: 'planned',
    modules: [
      { name: 'Cloudinary Uploads', desc: 'Real image uploads (not stubs)', done: false },
      { name: 'Admin Dashboard UI', desc: 'React admin frontend', done: false },
      { name: 'Sales Rep App', desc: 'Mobile-optimized in-store POS', done: false },
      { name: 'Customer Storefront', desc: 'Public e-commerce site', done: false },
    ],
  },
];

const statusConfig = {
  done: { label: 'Complete', color: 'bg-emerald-500' },
  progress: { label: 'In Progress', color: 'bg-amber-500' },
  planned: { label: 'Planned', color: 'bg-slate-300' },
} as const;

export default function Roadmap() {
  const totalDone = phases.reduce(
    (sum, phase) => sum + phase.modules.filter((m) => m.done).length,
    0
  );
  const totalModules = phases.reduce(
    (sum, phase) => sum + phase.modules.length,
    0
  );
  const totalPlanned = totalModules - totalDone;

  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">Roadmap</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-8">
        The build plan for Meubel House, in order. Phases are sequential — each
        builds on the last.
      </p>

      <div className="not-prose grid grid-cols-3 gap-4 mb-10">
        <ProgressCard
          label="Complete"
          value={totalDone.toString()}
          color="text-emerald-600"
        />
        <ProgressCard label="In Progress" value="0" color="text-amber-600" />
        <ProgressCard
          label="Planned"
          value={totalPlanned.toString()}
          color="text-slate-400"
        />
      </div>

      <div className="not-prose space-y-6">
        {phases.map((phase) => (
          <div
            key={phase.title}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 border-b border-slate-200">
              <span
                className={`w-2.5 h-2.5 rounded-full ${statusConfig[phase.status].color}`}
              ></span>
              <h2 className="font-bold text-slate-900">{phase.title}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-semibold ml-auto">
                {statusConfig[phase.status].label}
              </span>
            </div>

            <ul className="divide-y divide-slate-100">
              {phase.modules.map((mod) => (
                <li
                  key={mod.name}
                  className="flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition"
                >
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                      mod.done
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {mod.done ? '✓' : '○'}
                  </span>
                  <div className="flex-1">
                    <p
                      className={`font-semibold text-sm ${
                        mod.done ? 'text-slate-900' : 'text-slate-700'
                      }`}
                    >
                      {mod.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{mod.desc}</p>
                  </div>
                  {mod.done && (
                    <span className="text-xs font-semibold text-emerald-600 flex-shrink-0">
                      Done
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="not-prose mt-12 p-5 rounded-lg bg-slate-900 text-slate-100">
        <h3 className="font-bold text-base mb-2 text-white">
          🚫 Explicitly Out of Scope (for now)
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Wishlist, product comparison, abandoned cart recovery, WhatsApp/SMS,
          recommendation engine, loyalty points, multi-branch inventory
          transfers, supplier management, advanced analytics, accounting
          integration. These are v2 candidates.
        </p>
      </div>
    </article>
  );
}

function ProgressCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 bg-white text-center">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
