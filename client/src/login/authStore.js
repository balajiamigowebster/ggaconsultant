import { useState, useEffect, useCallback } from 'react';
import API from '../config.js';

const TOKEN_KEY = 'gga_auth_token_v1';
const USER_KEY = 'gga_auth_user_v1';
const AUTH_EVENT = 'gga_auth_state_changed';
const MODAL_EVENT = 'gga_login_modal_toggle';

// Read initial auth state from localStorage
export function getStoredAuth() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);
    const user = userRaw ? JSON.parse(userRaw) : null;
    return {
      token: token || null,
      user: user || null,
      isAuthenticated: Boolean(token && user)
    };
  } catch (e) {
    return { token: null, user: null, isAuthenticated: false };
  }
}

// Global modal trigger helpers
export function openLoginModal() {
  window.dispatchEvent(new CustomEvent(MODAL_EVENT, { detail: { open: true } }));
}

export function closeLoginModal() {
  window.dispatchEvent(new CustomEvent(MODAL_EVENT, { detail: { open: false } }));
}

// Hook to access authentication state and actions
export function useAuth() {
  const [authState, setAuthState] = useState(() => getStoredAuth());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 1. Sync auth state on custom event or storage change
    const syncAuth = () => {
      setAuthState(getStoredAuth());
    };

    const handleModalToggle = (e) => {
      if (e.detail && typeof e.detail.open === 'boolean') {
        setIsModalOpen(e.detail.open);
      }
    };

    window.addEventListener(AUTH_EVENT, syncAuth);
    window.addEventListener('storage', syncAuth);
    window.addEventListener(MODAL_EVENT, handleModalToggle);

    // 2. Validate token with backend if present
    const stored = getStoredAuth();
    if (stored.token) {
      fetch(`${API}/auth/me`, {
        headers: {
          Authorization: `Bearer ${stored.token}`
        }
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.success && data.user) {
            localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            setAuthState({
              token: stored.token,
              user: data.user,
              isAuthenticated: true
            });
          } else if (data && !data.success) {
            // Token expired or invalid
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            setAuthState({ token: null, user: null, isAuthenticated: false });
          }
        })
        .catch(() => {
          // Offline or network error: keep local session
        });
    }

    return () => {
      window.removeEventListener(AUTH_EVENT, syncAuth);
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener(MODAL_EVENT, handleModalToggle);
    };
  }, []);

  // Login action
  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Login failed. Please verify your credentials.'
        };
      }

      // Store credentials and update state
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      setAuthState({
        token: data.token,
        user: data.user,
        isAuthenticated: true
      });

      window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: data }));
      setIsModalOpen(false);

      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return {
        success: false,
        message: 'Could not connect to authentication server. Please check backend connection.'
      };
    }
  }, []);

  // Logout action
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAuthState({ token: null, user: null, isAuthenticated: false });
    window.dispatchEvent(new CustomEvent(AUTH_EVENT));
  }, []);

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isModalOpen,
    openLogin: () => setIsModalOpen(true),
    closeLogin: () => setIsModalOpen(false),
    login,
    logout
  };
}

