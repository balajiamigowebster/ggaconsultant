import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authStore';
import './LoginModal.css';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setError('');
      setLoading(false);
      setUsername('');
      setPassword('');
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please provide both username and password.');
      return;
    }

    setLoading(true);
    const result = await login(username.trim(), password);
    setLoading(false);

    if (result.success) {
      if (onSuccess) {
        onSuccess(result.user);
      } else {
        onClose();
        navigate('/dashboard');
      }
    } else {
      setError(result.message || 'Authentication failed. Check your password.');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="gga-login-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="gga-login-card">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="gga-login-close"
          aria-label="Close login dialog"
        >
          ✕
        </button>

        <div className="gga-login-card-inner">
          {/* Header */}
          <div className="gga-login-header">
            <div className="gga-login-brand">
              <img
                src="/images/gga-logo.jpg"
                alt="GGA MEP Consultants"
                className="gga-login-logo"
              />
            </div>
            <div>
              <span className="gga-login-badge">
                <span className="dot"></span>
                RESTRICTED ACCESS
              </span>
            </div>
            <h2 className="gga-login-title">Admin Dashboard Login</h2>
            <p className="gga-login-sub">
              Sign in with your verified credentials to access services &amp; project controls.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="gga-login-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="gga-login-form">
            {/* Username / Email */}
            <div className="gga-form-group">
              <label htmlFor="gga-admin-username" className="gga-form-label">
                Username or Email
              </label>
              <div className="gga-input-wrapper">
                <span className="gga-input-icon">👤</span>
                <input
                  id="gga-admin-username"
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username or email"
                  className="gga-input-field"
                />
              </div>
            </div>

            {/* Password */}
            <div className="gga-form-group">
              <label htmlFor="gga-admin-password" className="gga-form-label">
                Password
              </label>
              <div className="gga-input-wrapper">
                <span className="gga-input-icon">🔒</span>
                <input
                  id="gga-admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="gga-input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="gga-password-toggle"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="gga-login-submit"
            >
              {loading ? (
                <>
                  <span className="gga-spinner"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <span>↗</span>
                </>
              )}
            </button>
          </form>

          {/* Secure indicator */}
          <div className="gga-login-footer-note">
            🛡️ Encrypted with <strong>bcrypt</strong> password hashing &amp; JWT session verification.
          </div>
        </div>
      </div>
    </div>
  );
}

