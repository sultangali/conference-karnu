import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';

      const root = document.scrollingElement || html;
      if (root) root.scrollTop = 0;
      html.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      const topEl = document.getElementById('page-top');
      if (topEl) topEl.scrollIntoView({ behavior: 'auto', block: 'start' });

      html.style.scrollBehavior = prevBehavior;
    };

    scrollToTop();
    const t1 = setTimeout(scrollToTop, 0);
    const t2 = setTimeout(scrollToTop, 100);
    const t3 = setTimeout(scrollToTop, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
