import { isDark, Button } from '@lib';
import { DocSearch } from '@docsearch/react';
import cx from 'classnames';
import { FunctionComponent, useMemo, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { GitHub, Menu, X, Moon, Sun } from 'react-feather';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { themeState } from '../../atoms/home';
import { Blueberry, Dark } from '../../common/app-themes';
import { NAV_LINKS } from './constants';
import styles from './styles/navbar.module.scss';

// Custom Algolia hit component for navigation
const AlgoliaHitLanding = ({
  hit,
  children,
}: {
  children: ReactNode;
  hit: { url: string };
}) => {
  const route = `/${hit.url.split('/').pop()}`;
  return (
    <div className="rc-algolia-hit" style={{ width: '100%' }}>
      <Link to={route}>{children}</Link>
    </div>
  );
};

AlgoliaHitLanding.displayName = 'AlgoliaHitLanding';

const NavBar: FunctionComponent = () => {
  const nav = useNavigate();
  const isDarkMode = useMemo(() => isDark(), []);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useAtom(themeState);

  const handleNavigation = (path: string, external?: boolean) => {
    if (external) {
      window.open(path, '_blank');
    } else {
      nav(path);
      setIsMobileMenuOpen(false);
    }
  };

  const handleGetStarted = () => {
    nav('/home');
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      colors: prevTheme.darkMode ? { ...Blueberry } : { ...Dark },
      darkMode: !prevTheme.darkMode,
      selectedTheme: 'default',
    }));
  };

  return (
    <nav className={cx(styles.navbar, isDarkMode ? styles.dark : '')}>
      <div className={styles.navbar_container}>
        {/* Logo */}
        <div className={styles.navbar_logo} onClick={() => handleNavigation('/')}>
          <span className={styles.logo_text}>React Creme</span>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navbar_links}>
          {NAV_LINKS.map((link, index) => (
            <button
              key={index}
              className={styles.nav_link}
              onClick={() => handleNavigation(link.path, link.external)}
            >
              {link.external && <GitHub size={16} />}
              <span>{link.label}</span>
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className={styles.search_container}>
          <DocSearch
            apiKey={import.meta.env.VITE_APP_ALGOLIA_API_KEY as string}
            appId={import.meta.env.VITE_APP_ALGOLIA_APP_ID as string}
            indexName={import.meta.env.VITE_APP_ALGOLIA_INDEX_NAME as string}
            hitComponent={AlgoliaHitLanding}
            disableUserPersonalization
            placeholder="Search components..."
          />
        </div>

        {/* Desktop CTA */}
        <div className={styles.navbar_actions}>
          <button
            className={styles.theme_toggle}
            onClick={handleThemeToggle}
            aria-label="Toggle dark/light mode"
            title={theme.darkMode ? 'Light mode' : 'Dark mode'}
          >
            {theme.darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Button
            label="Get Started"
            onClick={handleGetStarted}
            size="sm"
            type="primary"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobile_menu_toggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={cx(styles.mobile_menu, isDarkMode ? styles.dark : '')}>
          <div className={styles.mobile_menu_links}>
            {NAV_LINKS.map((link, index) => (
              <button
                key={index}
                className={styles.mobile_nav_link}
                onClick={() => handleNavigation(link.path, link.external)}
              >
                {link.external && <GitHub size={18} />}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.mobile_menu_actions}>
            <Button
              label="Get Started"
              onClick={handleGetStarted}
              size="md"
              type="primary"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export { NavBar };
