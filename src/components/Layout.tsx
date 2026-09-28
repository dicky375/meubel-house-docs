import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪑</span>
            <div>
              <h1 className="font-bold text-lg text-slate-900 leading-tight">
                Meubel House
              </h1>
              <p className="text-xs text-slate-500 leading-tight">
                Backend Documentation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://meubel-house-backend.onrender.com/api-docs"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-600 hover:text-brand-600"
            >
              Swagger UI ↗
            </a>
            <a
              href="https://github.com/dicky375/meubel-house-backend"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-600 hover:text-brand-600"
            >
              GitHub ↗
            </a>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live
            </span>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-4xl px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
