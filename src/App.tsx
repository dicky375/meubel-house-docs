import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './content/Overview';
import Architecture from './content/Architecture';
import Deployment from './content/Deployment';
import ApiReference from './content/ApiReference';
import Database from './content/Database';
import TestAccounts from './content/TestAccounts';
import Roadmap from './content/Roadmap';
import Links from './content/Links';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/deployment" element={<Deployment />} />
          <Route path="/api" element={<ApiReference />} />
          <Route path="/database" element={<Database />} />
          <Route path="/test-accounts" element={<TestAccounts />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/links" element={<Links />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
