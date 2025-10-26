import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo, useState, useEffect } from 'react';
import { ArrowUp } from 'react-feather';
import styles from '../styles/scroll-to-top.module.scss';

const ScrollToTop: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled beyond 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  return (
    <button
      className={cx(
        styles.scroll_to_top,
        isDarkMode ? styles.dark : '',
        isVisible ? styles.visible : ''
      )}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp size={24} />
    </button>
  );
};

export { ScrollToTop };
