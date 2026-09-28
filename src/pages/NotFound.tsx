import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
      <p className="text-slate-600 mb-6">This page doesn't exist.</p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700"
      >
        Back to Overview
      </Link>
    </div>
  );
}
