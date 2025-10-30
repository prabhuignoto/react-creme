import classNames from 'classnames';
import deepEqual from 'fast-deep-equal';
import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router';
import { useAtom, useAtomValue } from 'jotai';
import { Drawer } from '../lib/components';
import '../lib/design/core.scss';
import '../lib/design/list.scss';
import '../lib/design/theme.scss';
import { AppMain } from './App-Main';
import './App.scss';
import { asideState, MediaState, themeState } from './atoms/home';
import SidebarHome from './home/sidebar-home';
import TableOfContents from './common/table-of-contents';

const App: FunctionComponent<{ media: MediaState }> = memo(
  ({ media }: { media: MediaState }) => {
    const sectionRef = useRef(null);
    const [asideValue, setAsideValue] = useAtom(asideState);
    const [openAside, setOpenAside] = useState(false);
    const theme = useAtomValue(themeState);
    const location = useLocation();

    const isLanding = useMemo(() => {
      const { pathname } = location;
      return pathname === '/landing' || pathname === '/';
    }, [location.pathname]);

    const isMobileOrTablet = useMemo(() => {
      return media && (media.isMobile || media.isTablet);
    }, [media]);

    // Sidebar visibility class for mobile drawer
    const sidebarClass = useMemo(() => {
      return classNames('app-aside', {
        'app-aside-visible': openAside && isMobileOrTablet,
      });
    }, [openAside, isMobileOrTablet]);

    // Dark mode body background
    useEffect(() => {
      if (theme.darkMode) {
        document.body.classList.add('dark');
        document.body.style.backgroundColor = 'var(--bg-primary)';
      } else {
        document.body.classList.remove('dark');
        document.body.style.backgroundColor = 'var(--bg-primary)';
      }

      // Cleanup: Remove styles and class on unmount
      return () => {
        document.body.classList.remove('dark');
        document.body.style.backgroundColor = '';
      };
    }, [theme.darkMode]);

    // Handle aside state from Jotai
    useEffect(() => {
      if (asideValue.isOpen) {
        setOpenAside(true);
      }
    }, [asideValue.isOpen]);

    const toggleOpen = useCallback(() => setOpenAside(prev => !prev), []);

    const canRenderDrawer = useMemo(() => {
      return isMobileOrTablet && openAside && !isLanding;
    }, [isMobileOrTablet, openAside, isLanding]);

    const onClose = useCallback(() => {
      setOpenAside(false);
      setAsideValue({ isAnyOverlayOpen: false, isOpen: false });
    }, [setAsideValue]);

    const onSelect = useCallback(() => {
      setOpenAside(false);
      setAsideValue({ isAnyOverlayOpen: false, isOpen: false });
    }, [setAsideValue]);

    const appClass = useMemo(
      () =>
        classNames(
          'app',
          theme.darkMode ? 'dark' : '',
          isLanding ? 'is-landing' : ''
        ),
      [theme.darkMode, isLanding]
    );

    // Show sidebar in grid on desktop, hide on mobile/tablet
    const showDesktopSidebar = useMemo(() => {
      return !isMobileOrTablet && !isLanding;
    }, [isMobileOrTablet, isLanding]);

    return (
      <div className={appClass}>
        {/* Desktop: Sidebar in Grid */}
        {showDesktopSidebar && (
          <aside className="app-aside app-aside-visible">
            <SidebarHome />
          </aside>
        )}

        {/* Mobile/Tablet: Sidebar in Drawer */}
        {canRenderDrawer && (
          <Drawer onClose={onClose} focusable={false}>
            <SidebarHome onSelect={onSelect} />
          </Drawer>
        )}

        {/* Main content area */}
        <AppMain media={media} toggleOpen={toggleOpen} ref={sectionRef} />

        {/* Table of Contents for desktop */}
        {showDesktopSidebar && (
          <aside className="app-toc">
            <TableOfContents
              containerSelector=".section-content"
              headingLevels={['h2', 'h3']}
              scrollOffset={80}
            />
          </aside>
        )}
      </div>
    );
  },
  (prev, next) => {
    return deepEqual(prev.media, next.media);
  }
);

App.displayName = 'App';

export default App;
