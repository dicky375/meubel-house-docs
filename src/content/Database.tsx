const tables = [
  {
    name: 'users',
    icon: '👤',
    description: 'Authentication and user profiles with RBAC',
    columns: [
      ['id', 'uuid', 'PK'],
      ['email', 'varchar(255)', 'UNIQUE'],
      ['password', 'varchar(255)', 'bcrypt hash'],
      ['firstName', 'varchar(255)', ''],
      ['lastName', 'varchar(255)', ''],
      ['phone', 'varchar(255)', 'nullable'],
      ['role', 'enum', 'CUSTOMER | SALES_REP | ADMIN'],
      ['isActive', 'boolean', 'default true'],
      ['lastLogin', 'timestamp', 'nullable'],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'categories',
    icon: '📂',
    description: 'Product categories with auto-generated slugs',
    columns: [
      ['id', 'uuid', 'PK'],
      ['name', 'varchar', ''],
      ['slug', 'varchar', 'UNIQUE'],
      ['description', 'text', 'nullable'],
      ['image', 'varchar', 'nullable'],
      ['isActive', 'boolean', 'default true'],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'products',
    icon: '🛋️',
    description: 'Core product catalogue',
    columns: [
      ['id', 'uuid', 'PK'],
      ['name', 'varchar', ''],
      ['slug', 'varchar', 'UNIQUE'],
      ['description', 'text', 'nullable'],
      ['shortDescription', 'text', 'nullable'],
      ['categoryId', 'uuid', 'FK → categories'],
      ['price', 'decimal(10,2)', ''],
      ['compareAtPrice', 'decimal(10,2)', 'nullable'],
      ['costPrice', 'decimal(10,2)', 'admin-only'],
      ['sku', 'varchar', 'UNIQUE'],
      ['brand', 'varchar', 'nullable'],
      ['material', 'varchar', 'nullable'],
      ['dimensions', 'jsonb', 'nullable'],
      ['weight', 'decimal(8,2)', 'nullable'],
      ['tags', 'text[]', 'array'],
      ['images', 'text[]', 'array'],
      ['featured', 'boolean', ''],
      ['topPick', 'boolean', ''],
      ['isNew', 'boolean', ''],
      ['status', 'enum', 'DRAFT | ACTIVE | INACTIVE | OUT_OF_STOCK | ARCHIVED'],
      ['isActive', 'boolean', ''],
      ['isPublished', 'boolean', ''],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'product_variants',
    icon: '🎨',
    description: 'Per-variant pricing and SKUs (colour, size, material)',
    columns: [
      ['id', 'uuid', 'PK'],
      ['productId', 'uuid', 'FK → products (CASCADE)'],
      ['colour', 'varchar', 'nullable'],
      ['size', 'varchar', 'nullable'],
      ['material', 'varchar', 'nullable'],
      ['sku', 'varchar', 'UNIQUE'],
      ['price', 'decimal(10,2)', ''],
      ['stock', 'integer', ''],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'inventory',
    icon: '📦',
    description: 'Variant-level stock, shared by all sales channels',
    columns: [
      ['id', 'uuid', 'PK'],
      ['productId', 'uuid', 'FK → products'],
      ['variantId', 'uuid', 'FK → product_variants'],
      ['storeId', 'uuid', 'default store'],
      ['quantity', 'integer', ''],
      ['reservedQuantity', 'integer', ''],
      ['availableQuantity', 'integer', 'quantity - reserved'],
      ['reorderLevel', 'integer', 'default 10'],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'inventory_transactions',
    icon: '📝',
    description: 'Audit trail for every stock change',
    columns: [
      ['id', 'uuid', 'PK'],
      ['productId', 'uuid', 'FK → products'],
      ['variantId', 'uuid', 'FK → product_variants'],
      ['type', 'enum', 'STOCK_IN | SALE | ADJUSTMENT | ...'],
      ['quantity', 'integer', 'signed delta'],
      ['previousQuantity', 'integer', ''],
      ['newQuantity', 'integer', ''],
      ['referenceType', 'varchar', 'e.g. Order'],
      ['referenceId', 'uuid', 'e.g. order id'],
      ['performedBy', 'uuid', 'FK → users'],
      ['reason', 'text', ''],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'carts',
    icon: '🛒',
    description: 'One active cart per user (JSONB items)',
    columns: [
      ['id', 'uuid', 'PK'],
      ['userId', 'uuid', 'FK → users (UNIQUE)'],
      ['items', 'jsonb', 'array of line items'],
      ['subtotal', 'decimal(10,2)', ''],
      ['discount', 'decimal(10,2)', ''],
      ['total', 'decimal(10,2)', ''],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'orders',
    icon: '📋',
    description: 'Both online and in-store orders',
    columns: [
      ['id', 'uuid', 'PK'],
      ['orderNumber', 'varchar', 'UNIQUE, human-readable'],
      ['customerId', 'uuid', 'FK → users (nullable)'],
      ['salesChannel', 'enum', 'ONLINE | IN_STORE'],
      ['salesRepId', 'uuid', 'FK → users'],
      ['items', 'jsonb', 'snapshotted line items'],
      ['subtotal', 'decimal(10,2)', ''],
      ['discount', 'decimal(10,2)', ''],
      ['deliveryFee', 'decimal(10,2)', ''],
      ['tax', 'decimal(10,2)', ''],
      ['total', 'decimal(10,2)', ''],
      ['currency', 'varchar', 'USD'],
      ['paymentStatus', 'enum', 'PENDING | PAID | FAILED | REFUNDED'],
      ['orderStatus', 'enum', 'PENDING → DELIVERED → COMPLETED'],
      ['deliveryStatus', 'enum', 'PENDING | PROCESSING | SHIPPED | DELIVERED'],
      ['shippingAddress', 'jsonb', 'nullable'],
      ['billingAddress', 'jsonb', 'nullable'],
      ['customerNote', 'text', 'nullable'],
      ['createdBy', 'uuid', 'FK → users'],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'payments',
    icon: '💳',
    description: 'Payment records (provider-agnostic)',
    columns: [
      ['id', 'uuid', 'PK'],
      ['orderId', 'uuid', 'FK → orders'],
      ['userId', 'uuid', 'FK → users'],
      ['provider', 'varchar', 'stripe | paypal | ...'],
      ['transactionReference', 'varchar', ''],
      ['amount', 'decimal(10,2)', ''],
      ['currency', 'varchar', ''],
      ['paymentMethod', 'varchar', ''],
      ['status', 'enum', 'PENDING | PAID | FAILED | ...'],
      ['amountPaid', 'decimal(10,2)', ''],
      ['amountDue', 'decimal(10,2)', ''],
      ['metadata', 'jsonb', 'provider raw payload'],
      ['paidAt', 'timestamp', 'nullable'],
    ],
  },
  {
    name: 'reviews',
    icon: '⭐',
    description: 'Verified reviews on delivered purchases',
    columns: [
      ['id', 'uuid', 'PK'],
      ['productId', 'uuid', 'FK → products'],
      ['userId', 'uuid', 'FK → users'],
      ['orderId', 'uuid', 'FK → orders (nullable)'],
      ['rating', 'integer', '1–5'],
      ['comment', 'text', 'nullable'],
      ['isVerified', 'boolean', ''],
      ['createdAt', 'timestamp', ''],
      ['updatedAt', 'timestamp', ''],
    ],
  },
  {
    name: 'promotions',
    icon: '🎁',
    description: 'Discount codes and deals',
    columns: [
      ['id', 'uuid', 'PK'],
      ['code', 'varchar', 'UNIQUE'],
      ['description', 'varchar', ''],
      ['type', 'enum', 'PERCENTAGE | FIXED | FREE_SHIPPING'],
      ['value', 'decimal(10,2)', ''],
      ['minimumOrder', 'decimal(10,2)', ''],
      ['startDate', 'date', ''],
      ['endDate', 'date', ''],
      ['usageLimit', 'integer', 'nullable'],
      ['usedCount', 'integer', 'default 0'],
      ['isActive', 'boolean', ''],
    ],
  },
  {
    name: 'notifications',
    icon: '🔔',
    description: 'User notifications (created by migrations)',
    columns: [
      ['id', 'uuid', 'PK'],
      ['userId', 'uuid', 'FK → users'],
      ['type', 'varchar', ''],
      ['title', 'varchar', ''],
      ['message', 'text', ''],
      ['isRead', 'boolean', 'default false'],
      ['createdAt', 'timestamp', ''],
    ],
  },
];

const totalColumns = tables.reduce((sum, t) => sum + t.columns.length, 0);

export default function Database() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">
        Database Schema
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-6">
        PostgreSQL database hosted on Neon. {tables.length} tables,{' '}
        {totalColumns} columns total.
      </p>

      {/* Quick Stats */}
      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <StatCard label="Tables" value={tables.length.toString()} />
        <StatCard label="Columns" value={totalColumns.toString()} />
        <StatCard label="Provider" value="Neon" />
        <StatCard label="Engine" value="Postgres 15" />
      </div>

      {/* Table Index */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Table Index
        </h2>
        <div className="not-prose flex flex-wrap gap-2">
          {tables.map((t) => (
            <a
              key={t.name}
              href={`#table-${t.name}`}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-brand-100 text-slate-700 hover:text-brand-700 font-mono transition"
            >
              {t.icon} {t.name}
            </a>
          ))}
        </div>
      </section>

      {/* Tables */}
      {tables.map((table) => (
        <section
          key={table.name}
          id={`table-${table.name}`}
          className="mb-10 scroll-mt-20"
        >
          <div className="not-prose">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{table.icon}</span>
              <h2 className="text-xl font-bold text-slate-900 font-mono">
                {table.name}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                {table.columns.length} cols
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4">{table.description}</p>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-slate-700 text-xs uppercase tracking-wider">
                      Column
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-slate-700 text-xs uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-slate-700 text-xs uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {table.columns.map(([col, type, note]) => (
                    <tr key={col} className="hover:bg-slate-50">
                      <td className="px-4 py-2 font-mono text-xs font-medium text-slate-900">
                        {col}
                      </td>
                      <td className="px-4 py-2 font-mono text-xs text-brand-600">
                        {type}
                      </td>
                      <td className="px-4 py-2 text-xs text-slate-500">
                        {note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}
    </article>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 bg-white text-center">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}
