export default function Architecture() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">Architecture</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-10">
        A modular monolith — not microservices. One deployable backend, one
        PostgreSQL database, three client types.
      </p>

      {/* System Diagram */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          System Diagram
        </h2>
        <div className="not-prose bg-slate-900 rounded-lg p-6 overflow-x-auto">
          <pre className="text-xs leading-relaxed text-emerald-300 font-mono">
{`┌────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATIONS                    │
├──────────────────┬─────────────────┬───────────────────────┤
│  Customer        │   Sales Rep     │   Admin Dashboard     │
│  Storefront      │   App           │   (Web)               │
│  (Web)           │   (In-Store)    │                       │
└────────┬─────────┴────────┬────────┴───────────┬───────────┘
         │                  │                     │
         └──────────────────┼─────────────────────┘
                            │ HTTPS / REST API
                            ▼
         ┌──────────────────────────────────────┐
         │   MEUBEL HOUSE BACKEND               │
         │   (Modular Monolith)                 │
         │   ──────────────────────────────────  │
         │   Node.js + Express + TypeScript     │
         │   ──────────────────────────────────  │
         │   Modules:                           │
         │   • Auth         • Orders            │
         │   • Users        • Payments          │
         │   • Products     • Sales             │
         │   • Categories   • Reviews           │
         │   • Inventory    • Promotions        │
         │   • Cart         • Reports           │
         │                  • Notifications     │
         │                  • Audit             │
         └─────────────────┬────────────────────┘
                           │
                           │ PostgreSQL (SSL)
                           ▼
         ┌──────────────────────────────────────┐
         │   NEON SERVERLESS POSTGRESQL         │
         │   14 tables, 0.5 GB free tier        │
         └──────────────────────────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Why Modular Monolith */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Why Modular Monolith?
        </h2>
        <div className="not-prose grid md:grid-cols-2 gap-4 mb-6">
          <ProConCard
            type="pro"
            title="Single deployment"
            description="One Docker image, one Render service, one deploy."
          />
          <ProConCard
            type="pro"
            title="Shared database"
            description="Transactions across modules. No distributed data consistency headaches."
          />
          <ProConCard
            type="pro"
            title="Fast to build"
            description="No service mesh, no message queues, no async orchestration."
          />
          <ProConCard
            type="pro"
            title="Scale-ready"
            description="Under 1,000 users expected. Will scale vertically or split later if needed."
          />
        </div>
        <div className="not-prose p-5 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Explicitly avoided:</strong> Microservices, message queues,
            event buses, CQRS, separate read/write databases. All would add
            operational cost without helping at this scale.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Module Structure
        </h2>
        <p className="text-slate-700 mb-6">
          Each module follows the same internal structure. A module never
          reaches into another module's model — it goes through the service
          layer.
        </p>
        <div className="not-prose bg-slate-900 rounded-lg p-6 overflow-x-auto mb-6">
          <pre className="text-xs leading-relaxed text-slate-300 font-mono">
{`src/modules/products/
├── product.model.ts          ← Objection model
├── productVariant.model.ts   ← Related model
├── product.service.ts        ← Business logic
├── product.controller.ts     ← HTTP handlers
├── product.routes.ts         ← Express routes
└── product.validation.ts     ← Zod schemas`}
          </pre>
        </div>

        {/* Modules Grid */}
        <div className="not-prose grid sm:grid-cols-2 gap-3">
          {([
  { name: 'auth', icon: '🔑', status: 'done' as const, desc: 'JWT, refresh, bcrypt' },
  { name: 'users', icon: '👥', status: 'done' as const, desc: 'Profile, RBAC' },
  { name: 'products', icon: '🛋️', status: 'done' as const, desc: 'CRUD, variants, filters' },
  { name: 'categories', icon: '📂', status: 'done' as const, desc: 'CRUD with slugs' },
  { name: 'inventory', icon: '📦', status: 'done' as const, desc: 'Stock + audit trail' },
  { name: 'cart', icon: '🛒', status: 'next' as const, desc: 'Cart management' },
  { name: 'orders', icon: '📋', status: 'next' as const, desc: 'Checkout, status flow' },
  { name: 'payments', icon: '💳', status: 'planned' as const, desc: 'Provider abstraction' },
  { name: 'sales', icon: '🏬', status: 'planned' as const, desc: 'In-store sales' },
  { name: 'reviews', icon: '⭐', status: 'planned' as const, desc: 'Verified reviews' },
  { name: 'promotions', icon: '🎁', status: 'planned' as const, desc: 'Coupons, deals' },
  { name: 'reports', icon: '📊', status: 'planned' as const, desc: 'Admin analytics' },
  { name: 'notifications', icon: '🔔', status: 'planned' as const, desc: 'Email, SMS' },
  { name: 'audit', icon: '📝', status: 'planned' as const, desc: 'Action logs' },
]).map((m) => (
  <ModuleCard key={m.name} {...m} />
))}
        </div>
      </section>

      {/* Request Flow */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Request Lifecycle
        </h2>
        <div className="not-prose space-y-2">
          {[
            { n: 1, label: 'Client sends HTTP request', detail: 'HTTPS to /api/v1/*' },
            { n: 2, label: 'Middleware chain', detail: 'Helmet → CORS → Rate Limit → Auth → Role' },
            { n: 3, label: 'Route match', detail: 'Express router dispatches to controller' },
            { n: 4, label: 'Validation', detail: 'Zod parses body/query/params' },
            { n: 5, label: 'Service layer', detail: 'Business logic, transactions, DB calls' },
            { n: 6, label: 'Model layer', detail: 'Objection.js queries PostgreSQL' },
            { n: 7, label: 'Response', detail: 'JSON with consistent error handling' },
          ].map((step) => (
            <div
              key={step.n}
              className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 bg-white"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
                {step.n}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {step.label}
                </p>
                <p className="text-xs text-slate-500">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

// ─── Helper Components ─────────────────────────────

function ProConCard({
  type,
  title,
  description,
}: {
  type: 'pro' | 'con';
  title: string;
  description: string;
}) {
  const styles = {
    pro: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    con: 'bg-red-50 border-red-200 text-red-700',
  };
  return (
    <div className={`p-4 rounded-lg border ${styles[type]}`}>
      <div className="flex items-start gap-2">
        <span className="text-lg">{type === 'pro' ? '✓' : '✗'}</span>
        <div>
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({
  name,
  icon,
  status,
  desc,
}: {
  name: string;
  icon: string;
  status: 'done' | 'next' | 'planned';
  desc: string;
}) {
  const badge = {
    done: 'bg-emerald-100 text-emerald-700',
    next: 'bg-amber-100 text-amber-700',
    planned: 'bg-slate-100 text-slate-500',
  };
  const badgeLabel = {
    done: 'Done',
    next: 'Next',
    planned: 'Planned',
  };
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:border-brand-500 transition">
      <span className="text-xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <code className="text-sm font-semibold text-slate-900">{name}</code>
          <span
            className={`text-xs px-1.5 py-0.5 rounded font-medium ${badge[status]}`}
          >
            {badgeLabel[status]}
          </span>
        </div>
        <p className="text-xs text-slate-500 truncate">{desc}</p>
      </div>
    </div>
  );
}
