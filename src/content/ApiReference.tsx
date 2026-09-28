import { useEffect, useState } from 'react';

const API_BASE = 'https://meubel-house-backend.onrender.com/api/v1';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  auth: 'Public' | 'Authenticated' | 'Admin' | 'Admin or Rep';
  description: string;
}

interface Module {
  name: string;
  icon: string;
  endpoints: Endpoint[];
}

const modules: Module[] = [
  {
    name: 'Auth',
    icon: '🔑',
    endpoints: [
      { method: 'POST', path: '/auth/register', auth: 'Public', description: 'Create a new user account (CUSTOMER role by default)' },
      { method: 'POST', path: '/auth/login', auth: 'Public', description: 'Login with email + password, returns access & refresh tokens' },
      { method: 'POST', path: '/auth/refresh', auth: 'Public', description: 'Exchange a refresh token for a new access token' },
    ],
  },
  {
    name: 'Users',
    icon: '👥',
    endpoints: [
      { method: 'GET', path: '/users/me', auth: 'Authenticated', description: 'Get the current authenticated user profile' },
      { method: 'GET', path: '/users', auth: 'Admin', description: 'List all users (paginated)' },
    ],
  },
  {
    name: 'Categories',
    icon: '📂',
    endpoints: [
      { method: 'GET', path: '/categories', auth: 'Public', description: 'List categories (paginated, filterable)' },
      { method: 'GET', path: '/categories/slug/:slug', auth: 'Public', description: 'Fetch a category by slug with products' },
      { method: 'GET', path: '/categories/:id', auth: 'Public', description: 'Fetch a category by ID' },
      { method: 'POST', path: '/categories', auth: 'Admin', description: 'Create a category (auto-generates slug)' },
      { method: 'PUT', path: '/categories/:id', auth: 'Admin', description: 'Update a category' },
      { method: 'DELETE', path: '/categories/:id', auth: 'Admin', description: 'Delete a category (fails if it has products)' },
    ],
  },
  {
    name: 'Products',
    icon: '🛋️',
    endpoints: [
      { method: 'GET', path: '/products', auth: 'Public', description: 'List products with filters, sort, pagination. costPrice hidden for public.' },
      { method: 'GET', path: '/products/slug/:slug', auth: 'Public', description: 'Fetch a product by slug with variants + inventory' },
      { method: 'GET', path: '/products/:id', auth: 'Public', description: 'Fetch a product by ID' },
      { method: 'POST', path: '/products', auth: 'Admin', description: 'Create a product (supports variants + initial stock)' },
      { method: 'PUT', path: '/products/:id', auth: 'Admin', description: 'Update a product (replaces variants if provided)' },
      { method: 'DELETE', path: '/products/:id', auth: 'Admin', description: 'Delete a product with all variants + inventory' },
    ],
  },
  {
    name: 'Inventory',
    icon: '📦',
    endpoints: [
      { method: 'GET', path: '/inventory', auth: 'Admin', description: 'List all inventory rows with product + variant details' },
      { method: 'GET', path: '/inventory/low-stock', auth: 'Admin', description: 'Items below reorder level' },
      { method: 'GET', path: '/inventory/transactions', auth: 'Admin', description: 'Full audit trail of every inventory change' },
      { method: 'GET', path: '/inventory/product/:productId', auth: 'Admin or Rep', description: 'Get inventory for a product (all variants)' },
      { method: 'GET', path: '/inventory/variant/:variantId', auth: 'Admin or Rep', description: 'Get inventory for a specific variant' },
      { method: 'PATCH', path: '/inventory/variant/:variantId', auth: 'Admin', description: 'Adjust stock (positive/negative, logs transaction)' },
    ],
  },
];

const methodStyles = {
  GET: 'bg-sky-100 text-sky-700',
  POST: 'bg-emerald-100 text-emerald-700',
  PUT: 'bg-amber-100 text-amber-700',
  PATCH: 'bg-violet-100 text-violet-700',
  DELETE: 'bg-red-100 text-red-700',
};

const authStyles = {
  Public: 'bg-slate-100 text-slate-600',
  Authenticated: 'bg-blue-100 text-blue-700',
  Admin: 'bg-red-100 text-red-700',
  'Admin or Rep': 'bg-orange-100 text-orange-700',
};

export default function ApiReference() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    fetch(`${API_BASE}/products?limit=1`)
      .then((res) => setApiStatus(res.ok ? 'online' : 'offline'))
      .catch(() => setApiStatus('offline'));
  }, []);

  const totalEndpoints = modules.reduce((sum, m) => sum + m.endpoints.length, 0);

  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">API Reference</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-6">
        All REST endpoints, grouped by module. Base URL:{' '}
        <code className="text-sm px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
          /api/v1
        </code>
      </p>

      {/* Status Bar */}
      <div className="not-prose flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-white mb-8">
        <StatusIndicator status={apiStatus} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">
            Live API Status
          </p>
          <p className="text-xs text-slate-500">
            {apiStatus === 'online' && `Responding normally · ${totalEndpoints} endpoints documented`}
            {apiStatus === 'offline' && 'Not responding — service may be cold-starting'}
            {apiStatus === 'checking' && 'Checking...'}
          </p>
        </div>
        <a
          href="https://meubel-house-backend.onrender.com/api-docs"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          Try in Swagger UI ↗
        </a>
      </div>

      {/* Auth Note */}
      <div className="not-prose mb-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>Authentication:</strong> Endpoints marked{' '}
          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
            Authenticated
          </span>{' '}
          require a JWT bearer token in the{' '}
          <code className="text-xs">Authorization</code> header. Obtain one via{' '}
          <code className="text-xs">POST /auth/login</code>.
        </p>
      </div>

      {/* Modules */}
      {modules.map((module) => (
        <section key={module.name} className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>{module.icon}</span>
            <span>{module.name}</span>
            <span className="text-sm font-normal text-slate-400">
              ({module.endpoints.length})
            </span>
          </h2>
          <div className="not-prose space-y-2">
            {module.endpoints.map((ep) => (
              <EndpointRow key={`${ep.method}-${ep.path}`} endpoint={ep} />
            ))}
          </div>
        </section>
      ))}

      {/* Footer Note */}
      <div className="not-prose mt-12 p-6 rounded-lg bg-slate-900 text-slate-100">
        <h3 className="font-bold text-lg mb-2 text-white">
          📚 Interactive API Docs
        </h3>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          For a full interactive experience — try endpoints directly in your
          browser with JWT authentication, see live request/response schemas,
          and export to Postman — visit the Swagger UI.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://meubel-house-backend.onrender.com/api-docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-md transition"
          >
            Open Swagger UI ↗
          </a>
          <a
            href="https://meubel-house-backend.onrender.com/api-docs.json"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-md transition"
          >
            Download OpenAPI JSON ↗
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Helper Components ─────────────────────────────

function EndpointRow({ endpoint }: { endpoint: Endpoint }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:border-brand-500 transition group">
      <span
        className={`flex-shrink-0 px-2 py-1 rounded text-xs font-bold tracking-wide ${methodStyles[endpoint.method]}`}
        style={{ minWidth: '60px', textAlign: 'center' }}
      >
        {endpoint.method}
      </span>
      <code className="flex-shrink-0 text-sm font-mono font-medium text-slate-900 group-hover:text-brand-700">
        {endpoint.path}
      </code>
      <span
        className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold ${authStyles[endpoint.auth]}`}
      >
        {endpoint.auth}
      </span>
      <p className="flex-1 text-sm text-slate-500 truncate hidden lg:block">
        {endpoint.description}
      </p>
    </div>
  );
}

function StatusIndicator({ status }: { status: 'checking' | 'online' | 'offline' }) {
  const config = {
    checking: { color: 'bg-amber-500', label: 'Checking...' },
    online: { color: 'bg-emerald-500', label: 'Online' },
    offline: { color: 'bg-red-500', label: 'Offline' },
  };
  const c = config[status];
  return (
    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
      <span className={`w-2 h-2 rounded-full ${c.color} ${status === 'online' ? 'animate-pulse' : ''}`}></span>
      <span className="text-xs font-semibold text-slate-700">{c.label}</span>
    </span>
  );
}
