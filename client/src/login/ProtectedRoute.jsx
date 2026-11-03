import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './authStore';
import LoginModal from './LoginModal';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);

  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative font-['Space_Grotesk',sans-serif]">
      {/* Background Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-amber-400/10">
          🔒
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold tracking-widest uppercase mb-3">
          Restricted Zone
        </span>

        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
          Admin Access Required
        </h2>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The GGA MEP Control Panel is protected. Please sign in with your verified administrator username and password to proceed.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="w-full py-3 px-5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span>
            <span>↗</span>
          </button>

          <Link
            to="/"
            className="inline-block text-xs font-semibold text-slate-400 hover:text-white transition-colors pt-2"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => setShowLoginModal(false)}
      />
    </div>
  );
}

