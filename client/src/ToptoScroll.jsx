import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ToptoScroll Component
 * 1. Automatically scrolls smoothly to the very top whenever the route/menu changes.
 * 2. Provides an interactive floating "Scroll to Top" button when the user scrolls down.
 */
export default function ToptoScroll() {
  const { pathname, search } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // 1. Route change scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname, search]);

  // 2. Listen to scroll position for floating button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to Top"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
      <span className="scroll-to-top-tooltip">Back to Top</span>
    </button>
  );
}
