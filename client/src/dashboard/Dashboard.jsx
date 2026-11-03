import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServicesDashboard from './ServicesDashboard.jsx';
import ProjectsDashboard from './ProjectsDashboard.jsx';
import { useServices } from './servicesStore.js';
import { useProjects } from './projectsStore.js';
import './Dashboard.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('services');
  const { services } = useServices();
  const { projects } = useProjects();

  useEffect(() => {
    document.title = "Admin Dashboard | GGA MEP Design Consultants";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Space_Grotesk',sans-serif]">
      {/* Top Navigation Bar with Tailwind */}
      <header className="sticky top-0 z-50 h-16 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3.5 group text-decoration-none">
            <img
              src="/images/gga-logo.jpg"
              alt="GGA Logo"
              className="h-9 w-auto rounded shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-wide">GGA MEP CONSULTANTS</span>
              <span className="text-amber-400 font-bold text-[10px] tracking-wider uppercase">Admin Control Panel</span>
            </div>
          </Link>

          {/* Quick status & Public site link */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
              <span>Live Synced</span>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/60 rounded-lg transition-all"
            >
              <span>View Website</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Shell Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row min-w-0">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 bg-slate-900/50 border-b lg:border-b-0 lg:border-r border-slate-800/80 p-4 lg:p-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Group: Content Management */}
            <div>
              <span className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 mb-2.5">
                Content Management
              </span>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'services'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">📐</span>
                    <span>Services</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeTab === 'services'
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {services.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'projects'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🏢</span>
                    <span>Projects</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeTab === 'projects'
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {projects.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'settings'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">⚙️</span>
                    <span>Site Settings</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    Soon
                  </span>
                </button>
              </nav>
            </div>

            {/* Group: Quick Public Links */}
            <div>
              <span className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 mb-2.5">
                Public Shortcuts
              </span>
              <div className="space-y-1">
                <Link
                  to="/services"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                >
                  <span>↗</span>
                  <span>Public Services Page</span>
                </Link>
                <Link
                  to="/contact-us"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                >
                  <span>✉️</span>
                  <span>Public Contact Form</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar Footer Hint */}
          <div className="mt-8 pt-4 border-t border-slate-800/80">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <strong className="text-amber-400 block mb-1">Tailwind Powered</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed m-0">
                All changes reflect instantly in public pages and persist in browser &amp; backend storage.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          {activeTab === 'services' && <ServicesDashboard />}

          {activeTab === 'projects' && <ProjectsDashboard />}

          {activeTab === 'settings' && (
            <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center">
              <span className="text-5xl mb-4">⚙️</span>
              <h2 className="text-xl font-bold text-white mb-2">Site Settings Module</h2>
              <p className="text-slate-400 max-w-md text-sm mb-6">
                Configure corporate addresses, official email routing, phone contacts, and WhatsApp CTA triggers.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className="px-5 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-xs"
              >
                Return to Services
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
