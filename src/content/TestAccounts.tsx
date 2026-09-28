const accounts = [
  {
    role: 'ADMIN',
    roleColor: 'bg-red-100 text-red-700',
    email: 'admin@meubel.com',
    password: 'password123',
    permissions: [
      'Full CRUD on products, categories, users',
      'Adjust inventory (with audit trail)',
      'View all orders and reports',
      'Manage promotions and reviews',
      'Promote/demote user roles',
    ],
  },
  {
    role: 'CUSTOMER',
    roleColor: 'bg-emerald-100 text-emerald-700',
    email: 'customer@test.com',
    password: 'password123',
    permissions: [
      'Browse products (public)',
      'Add to cart, checkout',
      'View own orders',
      'Leave reviews on delivered purchases',
      'Manage own profile',
    ],
  },
  {
    role: 'SALES_REP',
    roleColor: 'bg-amber-100 text-amber-700',
    email: '(register via admin)',
    password: '—',
    permissions: [
      'In-store sales on same inventory pool',
      'Create orders for walk-in customers',
      'Apply permitted discounts',
      'View own sales only',
      'Cannot delete products or change prices',
    ],
  },
];

export default function TestAccounts() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">
        Test Accounts
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-8">
        Development credentials provisioned on the production database.
      </p>

      {/* Warning */}
      <div className="not-prose mb-8 p-4 rounded-lg bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-900 leading-relaxed">
          <strong>⚠️ Development credentials.</strong> These passwords are
          intentionally weak for testing. Rotate them (and the JWT secrets)
          before any public launch.
        </p>
      </div>

      {/* Accounts */}
      <div className="not-prose space-y-6">
        {accounts.map((account) => (
          <div
            key={account.role}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full tracking-wide ${account.roleColor}`}
              >
                {account.role}
              </span>
              <span className="text-xs text-slate-500">
                {account.permissions.length} permissions
              </span>
            </div>

            {/* Credentials */}
            <div className="grid md:grid-cols-2 gap-4 p-5 border-b border-slate-100">
              <Field label="Email" value={account.email} mono />
              <Field label="Password" value={account.password} mono />
            </div>

            {/* Permissions */}
            <div className="p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Permissions
              </p>
              <ul className="space-y-1.5">
                {account.permissions.map((perm) => (
                  <li
                    key={perm}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span>{perm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* How to login */}
      <section className="mt-12 not-prose">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          How to Authenticate
        </h2>
        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto mb-4">
          <pre className="text-xs leading-relaxed text-emerald-300 font-mono">
{`curl -X POST https://meubel-house-backend.onrender.com/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@meubel.com","password":"password123"}'`}
          </pre>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          The response contains an{' '}
          <code className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
            accessToken
          </code>{' '}
          (short-lived, ~15 min) and a{' '}
          <code className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
            refreshToken
          </code>{' '}
          (long-lived, ~7 days). Use the access token in subsequent requests:
        </p>
        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-xs leading-relaxed text-blue-300 font-mono">
{`curl https://meubel-house-backend.onrender.com/api/v1/users/me \\
  -H "Authorization: Bearer <accessToken>"`}
          </pre>
        </div>
      </section>
    </article>
  );
}

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p
        className={`text-sm text-slate-900 ${
          mono ? 'font-mono bg-slate-50 px-2 py-1 rounded inline-block' : ''
        }`}
      >
        {value}
      </p>
    </div>
  );
}
