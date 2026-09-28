import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { to: '/', label: 'Overview', icon: '📖' },
      { to: '/architecture', label: 'Architecture', icon: '🏗️' },
      { to: '/deployment', label: 'Deployment', icon: '🚀' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { to: '/api', label: 'API Endpoints', icon: '🔌' },
      { to: '/database', label: 'Database Schema', icon: '🗄️' },
      { to: '/test-accounts', label: 'Test Accounts', icon: '🔐' },
    ],
  },
  {
    title: 'Project',
    items: [
      { to: '/roadmap', label: 'Roadmap', icon: '🗺️' },
      { to: '/links', label: 'Links', icon: '🔗' },
    ],
  },
];

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition ${
      isActive
        ? 'bg-brand-600 text-white font-medium'
        : 'text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <aside className="w-64 border-r border-gray-200 bg-white min-h-[calc(100vh-4rem)] sticky top-16 self-start">
      <nav className="p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={linkClass} end={item.to === '/'}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
