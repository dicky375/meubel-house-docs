const linkGroups = [
  {
    title: 'Production Endpoints',
    icon: '🌐',
    links: [
      {
        label: 'API Base URL',
        url: 'https://meubel-house-backend.onrender.com/api/v1',
        description: 'Root of all REST endpoints',
      },
      {
        label: 'Health Check',
        url: 'https://meubel-house-backend.onrender.com/health',
        description: 'Lightweight ping — used by UptimeRobot',
      },
      {
        label: 'Swagger UI',
        url: 'https://meubel-house-backend.onrender.com/api-docs',
        description: 'Interactive API explorer with try-it-out',
      },
      {
        label: 'OpenAPI JSON',
        url: 'https://meubel-house-backend.onrender.com/api-docs.json',
        description: 'Import into Postman, Insomnia, or codegen',
      },
    ],
  },
  {
    title: 'Source & Deploy',
    icon: '🚀',
    links: [
      {
        label: 'GitHub Repository',
        url: 'https://github.com/dicky375/meubel-house-backend',
        description: 'Main branch, auto-deploys to Render',
      },
      {
        label: 'Render Dashboard',
        url: 'https://dashboard.render.com',
        description: 'API hosting — logs, env vars, deploys',
      },
      {
        label: 'Neon Dashboard',
        url: 'https://console.neon.tech',
        description: 'PostgreSQL — tables, queries, metrics',
      },
      {
        label: 'UptimeRobot',
        url: 'https://uptimerobot.com',
        description: 'Keeps Render awake (5-min pings)',
      },
    ],
  },
  {
    title: 'Third-Party Services',
    icon: '🔌',
    links: [
      {
        label: 'Cloudinary',
        url: 'https://cloudinary.com',
        description: 'Image hosting (planned integration)',
      },
      {
        label: 'Stripe',
        url: 'https://stripe.com',
        description: 'Payment provider (planned integration)',
      },
      {
        label: 'Vercel',
        url: 'https://vercel.com',
        description: 'Frontend hosting (this docs site)',
      },
      {
        label: 'Docker Hub',
        url: 'https://hub.docker.com',
        description: 'Container registry',
      },
    ],
  },
  {
    title: 'Local Development',
    icon: '💻',
    links: [
      {
        label: 'Local API',
        url: 'http://localhost:5000',
        description: 'npm run dev (native Postgres)',
      },
      {
        label: 'Local Docker API',
        url: 'http://localhost:5001',
        description: 'docker-compose up (Docker Postgres)',
      },
      {
        label: 'Local Docs',
        url: 'http://localhost:5173',
        description: 'This documentation site',
      },
    ],
  },
];

export default function Links() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">Links</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-10">
        Every URL you need — endpoints, dashboards, and tools.
      </p>

      <div className="not-prose space-y-8">
        {linkGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>{group.icon}</span>
              <span>{group.title}</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {group.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-500 hover:shadow-sm transition group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900 group-hover:text-brand-600 transition">
                      {link.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {link.description}
                    </p>
                    <code className="text-xs text-slate-400 truncate block mt-2 font-mono">
                      {link.url.replace('https://', '').replace('http://', '')}
                    </code>
                  </div>
                  <span className="flex-shrink-0 text-slate-300 group-hover:text-brand-600 transition text-lg">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer Note */}
      <div className="not-prose mt-12 p-5 rounded-lg bg-slate-50 border border-slate-200">
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Tip:</strong> Bookmark the{' '}
          <a
            href="https://meubel-house-backend.onrender.com/api-docs"
            target="_blank"
            rel="noreferrer"
            className="text-brand-600 hover:underline font-medium"
          >
            Swagger UI
          </a>{' '}
          for quick API testing. It supports JWT authentication — click{' '}
          <strong>Authorize</strong> at the top and paste an access token from{' '}
          <code className="text-xs px-1.5 py-0.5 rounded bg-slate-200">
            POST /auth/login
          </code>
          .
        </p>
      </div>
    </article>
  );
}
