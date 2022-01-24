import classNames from 'classnames';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ResizeObserver from 'resize-observer-polyfill';
import { useDebouncedCallback } from 'use-debounce';
import { Drawer } from '../lib/components';
import { ThemeProvider } from '../lib/components/common/theme-provider';
import '../lib/design/colors.scss';
import '../lib/design/layout.scss';
import '../lib/design/list.scss';
import AppRoutes from './app-routes';
import './App.scss';
import { asideState, responsiveState, themeState } from './atoms/home';
import Footer from './common/footer';
import { Header } from './common/header';
import SidebarHome from './common/sidebar-home';
import useMedia from './common/useMedia';

function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [left, setLeft] = React.useState(-1);
  const resizeObserver = useRef<ResizeObserver>();

  const [asideValue, setAsideValue] = useRecoilState(asideState);
  const setResponsiveState = useSetRecoilState(responsiveState);

  const media = useMedia();
  const appRef = useRef<HTMLDivElement>(null);
  const [openAside, setOpenAside] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useRecoilState(themeState);

  const sidebarClass = useMemo(() => {
    return classNames('app-aside', {
      'app-aside-visible': left > -1,
    });
  }, [left]);

  const positionAside = useCallback(() => {
    if (sectionRef.current && asideRef.current && !media.isMobile) {
      const asideWidth = asideRef.current.offsetWidth;
      const { left: sectionLeft } = sectionRef.current.getBoundingClientRect();
      if (sectionLeft - asideWidth > 0) {
        setLeft(sectionLeft - asideWidth);
      } else {
        setLeft(0);
      }
    }
  }, [media]);

  const debouncedPositionAside = useDebouncedCallback(positionAside, 100);

  const onRef = (el: HTMLElement) => {
    if (el && asideRef.current) {
      sectionRef.current = el;
      positionAside();
    }
  };

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(() => debouncedPositionAside());
    resizeObserver.current.observe(document.body);
    return () => {
      resizeObserver.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (asideValue.isOpen) {
      setOpenAside(true);
    }
  }, [asideValue]);

  useEffect(() => {
    if (!media) {
      return;
    }

    setResponsiveState({
      isBigScreen: media.isBigScreen,
      isDesktop: media.isDesktop,
      isExtraLargeScreen: media.isExtraLargeScreen,
      isMobile: media.isMobile,
      isTablet: media.isTablet,
    });
  }, [media]);

  const toggleOpen = useCallback(() => setOpenAside(prev => !prev), []);

  const canRenderAside = useMemo(() => {
    return media && media.isMobile && openAside;
  }, [media, openAside]);

  const onClose = useCallback(() => {
    setOpenAside(false);
    setAsideValue({ isOpen: false });
  }, []);

  return (
    <div className="app" ref={appRef}>
      {media && !media.isMobile && (
        <aside
          className={sidebarClass}
          ref={asideRef}
          style={{ left: `${left}px` }}
        >
          <SidebarHome />
        </aside>
      )}
      {canRenderAside && (
        <Drawer onClose={onClose} showClose>
          <SidebarHome />
        </Drawer>
      )}
      <section className="app-main-section" ref={onRef}>
        {location.pathname !== '/' && (
          <Header
            isMobile={media && media.isMobile}
            onOpen={toggleOpen}
            onSearchSelection={path => navigate(path.value)}
          />
        )}
        <Suspense fallback={<span></span>}>
          <ThemeProvider theme={theme} name="red">
            <AppRoutes />
          </ThemeProvider>
        </Suspense>
        <Footer />
      </section>
    </div>
  );
}

export default App;
