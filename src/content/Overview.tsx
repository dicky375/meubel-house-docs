import { Link } from 'react-router-dom';

export default function Overview() {
  return (
    <article className="prose prose-slate max-w-none">
      {/* Hero */}
      <div className="not-prose mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Production Ready
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          Meubel House Backend
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          A furniture e-commerce and multi-channel sales platform — powering
          online storefront, in-store sales reps, and admin operations from a
          single modular monolith.
        </p>
      </div>

      {/* Quick Info Grid */}
      <div className="not-prose grid sm:grid-cols-2 gap-4 mb-12">
        <InfoCard
          icon="⚡"
          label="Framework"
          value="Node.js + Express + TypeScript"
        />
        <InfoCard
          icon="🗄️"
          label="Database"
          value="PostgreSQL (Knex + Objection)"
        />
        <InfoCard
          icon="🔐"
          label="Auth"
          value="JWT + Refresh Tokens + RBAC"
        />
        <InfoCard
          icon="🐳"
          label="Deployment"
          value="Render + Neon + Docker"
        />
      </div>

      {/* What It Does */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          What It Does
        </h2>
        <p className="text-slate-700 mb-4">
          Meubel House runs three distinct client experiences on top of one
          authoritative backend:
        </p>
        <div className="not-prose grid md:grid-cols-3 gap-4 mt-6">
          <FeatureCard
            icon="🛒"
            title="Customer Storefront"
            description="Browse products, add to cart, checkout online, track orders, leave reviews."
          />
          <FeatureCard
            icon="🏬"
            title="Sales Rep App"
            description="In-store sales on the same inventory pool. Create orders for walk-in customers."
          />
          <FeatureCard
            icon="📊"
            title="Admin Dashboard"
            description="Full product/category/inventory/user management with reporting."
          />
        </div>
      </section>

      {/* Core Principle */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          The Core Principle
        </h2>
        <div className="not-prose p-6 rounded-lg bg-slate-900 text-slate-100 border-l-4 border-brand-500">
          <p className="mb-3">
            <strong className="text-brand-400">One authoritative catalogue, one inventory system, one order system.</strong>
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            An online purchase and an in-store sale are <em>both</em>{' '}
            <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-300 text-xs">
              Order
            </code>{' '}
            records, distinguished by a{' '}
            <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-300 text-xs">
              salesChannel
            </code>{' '}
            field — not separate systems.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Tech Stack</h2>
        <div className="not-prose overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Layer
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Technology
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['Runtime', 'Node.js 20 (LTS)'],
                ['Framework', 'Express.js'],
                ['Language', 'TypeScript (strict mode)'],
                ['Database', 'PostgreSQL 15+'],
                ['ORM', 'Knex.js + Objection.js'],
                ['Validation', 'Zod'],
                ['Auth', 'JWT + bcrypt + refresh tokens'],
                ['API Docs', 'OpenAPI 3.0 + Swagger UI'],
                ['Container', 'Docker (multi-stage)'],
                ['Hosting', 'Render (free tier)'],
                ['DB Hosting', 'Neon (serverless Postgres)'],
                ['Image Storage', 'Cloudinary / S3 (planned)'],
                ['Payments', 'Provider abstraction (planned)'],
              ].map(([layer, tech]) => (
                <tr key={layer}>
                  <td className="px-4 py-3 text-slate-600 font-medium">
                    {layer}
                  </td>
                  <td className="px-4 py-3 text-slate-900">{tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Explore Further */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Explore the Documentation
        </h2>
        <div className="not-prose grid sm:grid-cols-2 gap-3">
          <QuickLink
            to="/architecture"
            icon="🏗️"
            title="Architecture"
            description="How the modules fit together"
          />
          <QuickLink
            to="/deployment"
            icon="🚀"
            title="Deployment"
            description="Render + Neon + Docker setup"
          />
          <QuickLink
            to="/api"
            icon="🔌"
            title="API Reference"
            description="All endpoints, grouped by module"
          />
          <QuickLink
            to="/test-accounts"
            icon="🔐"
            title="Test Accounts"
            description="Dev credentials for testing"
          />
        </div>
      </section>
    </article>
  );
}

// ─── Helper Components ─────────────────────────────

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-500 transition">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-sm text-slate-900 font-medium mt-0.5">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 rounded-lg border border-slate-200 bg-white hover:shadow-md transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function QuickLink({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-500 hover:shadow-sm transition group"
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition">
          {title}
        </p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <span className="text-slate-400 group-hover:text-brand-500 transition">
        →
      </span>
    </Link>
  );
}
