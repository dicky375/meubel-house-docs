export default function Deployment() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">Deployment</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-10">
        Meubel House runs on a free-tier production stack — Render for the API,
        Neon for the database, Docker for the container. Total monthly cost:
        $0.
      </p>

      {/* Architecture Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Production Topology
        </h2>
        <div className="not-prose bg-slate-900 rounded-lg p-6 overflow-x-auto mb-6">
          <pre className="text-xs leading-relaxed text-blue-300 font-mono">
{`    Developer                    GitHub                Production
    ─────────                    ──────                ──────────

    git push  ───────────────▶  main branch
                                      │
                                      │ webhook
                                      ▼
                              ┌────────────────┐
                              │    RENDER      │
                              │  (Docker)      │
                              │  node:20-alpine│
                              └───────┬────────┘
                                      │
                                      │ SQL (SSL)
                                      ▼
                              ┌────────────────┐
                              │    NEON        │
                              │  Serverless    │
                              │  PostgreSQL    │
                              └────────────────┘

                              ┌────────────────┐
                              │  UPTIMEROBOT   │
                              │  pings /health │
                              │  every 5 min   │
                              └───────┬────────┘
                                      │
                                      ▼
                              (keeps Render awake)`}
          </pre>
        </div>
      </section>

      {/* Infrastructure Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Infrastructure
        </h2>
        <div className="not-prose overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Component
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Provider
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Plan
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['API Hosting', 'Render', 'Free Tier', '$0'],
                ['Database', 'Neon', 'Free Tier (0.5 GB)', '$0'],
                ['Container', 'Docker', 'Multi-stage build', '$0'],
                ['Uptime Monitor', 'UptimeRobot', 'Free Tier', '$0'],
                ['Source Control', 'GitHub', 'Public Repo', '$0'],
                ['DNS/CDN', 'Render + Cloudflare', 'Included', '$0'],
              ].map(([comp, prov, plan, cost]) => (
                <tr key={comp}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {comp}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{prov}</td>
                  <td className="px-4 py-3 text-slate-600">{plan}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">
                    {cost}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-semibold">
                <td className="px-4 py-3 text-slate-900" colSpan={3}>
                  Total Monthly Cost
                </td>
                <td className="px-4 py-3 text-emerald-600">$0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Live URLs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Live URLs
        </h2>
        <div className="not-prose space-y-2">
          <UrlRow
            label="API Base"
            url="https://meubel-house-backend.onrender.com/api/v1"
          />
          <UrlRow
            label="Health Check"
            url="https://meubel-house-backend.onrender.com/health"
          />
          <UrlRow
            label="Swagger UI"
            url="https://meubel-house-backend.onrender.com/api-docs"
          />
          <UrlRow
            label="OpenAPI JSON"
            url="https://meubel-house-backend.onrender.com/api-docs.json"
          />
          <UrlRow
            label="GitHub Repo"
            url="https://github.com/dicky375/meubel-house-backend"
          />
        </div>
      </section>

      {/* Docker Build */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Docker Build
        </h2>
        <p className="text-slate-700 mb-4">
          The Dockerfile uses a <strong>multi-stage build</strong> to keep the
          final image lean (~300 MB).
        </p>
        <div className="not-prose bg-slate-900 rounded-lg p-6 overflow-x-auto mb-6">
          <pre className="text-xs leading-relaxed text-slate-300 font-mono">
{`# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                 # all deps for build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build          # TypeScript → dist/

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache dumb-init postgresql-client
COPY package*.json ./
RUN npm ci --omit=dev      # prod deps only
COPY --from=builder /app/dist ./dist

EXPOSE 5000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]`}
          </pre>
        </div>
      </section>

      {/* Environment Variables */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Environment Variables
        </h2>
        <p className="text-slate-700 mb-4">
          These are set on Render → Web Service → Environment:
        </p>
        <div className="not-prose overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Variable
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Purpose
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Required
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['NODE_ENV', 'Runtime mode (production)', true],
                ['DATABASE_URL', 'Neon PostgreSQL connection', true],
                ['JWT_SECRET', 'Access token signing key', true],
                ['JWT_REFRESH_SECRET', 'Refresh token signing key', true],
                ['JWT_EXPIRY', 'Access token lifetime (e.g. 2h)', false],
                ['JWT_REFRESH_EXPIRY', 'Refresh token lifetime (e.g. 7d)', false],
                ['FRONTEND_URL', 'CORS allowed origin', false],
                ['PORT', 'Server port (Render sets it)', false],
              ].map(([key, desc, required]) => (
                <tr key={key as string}>
                  <td className="px-4 py-3 font-mono text-xs font-medium text-slate-900">
                    {key as string}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{desc as string}</td>
                  <td className="px-4 py-3">
                    {required ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">
                        Required
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                        Optional
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Migrations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Database Migrations
        </h2>
        <p className="text-slate-700 mb-4">
          Migrations are run manually against Neon from the local terminal:
        </p>
        <div className="not-prose bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-xs leading-relaxed text-emerald-300 font-mono">
{`export DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"
NODE_ENV=production npx knex migrate:latest --knexfile src/config/knexfile.ts

# Output:
# Batch 1 run: 3 migrations`}
          </pre>
        </div>
        <div className="not-prose mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-900 leading-relaxed">
            <strong>Why manual?</strong> Render's free tier doesn't support a
            pre-deploy command for Docker services. Running migrations locally
            against Neon is a reliable workaround.
          </p>
        </div>
      </section>

      {/* Free Tier Limits */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Free Tier Limits to Know
        </h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <LimitCard
            icon="⚠️"
            title="Render"
            items={[
              'Spins down after 15 min idle',
              'Cold start ~30-60 seconds',
              '750 hours/month free',
              'Mitigated by UptimeRobot',
            ]}
          />
          <LimitCard
            icon="⚠️"
            title="Neon"
            items={[
              '0.5 GB storage cap',
              'Writes fail if exceeded',
              'Scales to zero when idle',
              '100 compute-hours/month',
            ]}
          />
        </div>
      </section>
    </article>
  );
}

// ─── Helper Components ─────────────────────────────

function UrlRow({ label, url }: { label: string; url: string }) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-slate-200 bg-white hover:border-brand-500 transition group">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <code className="text-xs text-slate-700 truncate block">{url}</code>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex-shrink-0 text-slate-400 group-hover:text-brand-600 transition"
      >
        ↗
      </a>
    </div>
  );
}

function LimitCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="p-5 rounded-lg border border-slate-200 bg-white">
      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-slate-600 flex items-start gap-2"
          >
            <span className="text-slate-400 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
