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
import ResizeObserver from 'resize-observer-polyfill';
import { Drawer } from '../lib/components';
import '../lib/design/core.scss';
import '../lib/design/list.scss';
import '../lib/design/theme.scss';
import { AppMain } from './App-Main';
import './App.scss';
import { asideState, MediaState, themeState } from './atoms/home';
import SidebarHome from './home/sidebar-home';

const App: FunctionComponent<{ media: MediaState }> = memo(
  ({ media }: { media: MediaState }) => {
    const sectionRef = useRef(null);
    const asideRef = useRef<HTMLElement | null>(null);
    const [left, setLeft] = useState(-1);
    const resizeObserver = useRef<ResizeObserver | null>(null);

    const [asideValue, setAsideValue] = useAtom(asideState);

    const appRef = useRef<HTMLDivElement | null>(null);
    const [openAside, setOpenAside] = useState(false);

    const theme = useAtomValue(themeState);

    const sidebarClass = useMemo(() => {
      return classNames('app-aside', {
        'app-aside-visible': left > -1,
      });
    }, [left]);

    const location = useLocation();

    const isLanding = useMemo(() => {
      const { pathname } = location;
      return pathname === '/landing' || pathname === '/';
    }, [location.pathname]);

    const positionAside = useCallback(() => {
      if (
        sectionRef.current &&
        asideRef.current &&
        !media.isMobile &&
        !isLanding
      ) {
        const asideWidth = asideRef.current.offsetWidth;
        const { left: sectionLeft } =
          sectionRef.current.getBoundingClientRect();
        if (sectionLeft - asideWidth > 0) {
          setLeft(sectionLeft - asideWidth);
        } else {
          setLeft(0);
        }
      }
    }, [media, isLanding]);

    const onAppRef = (el: HTMLDivElement) => {
      if (el) {
        appRef.current = el;
        positionAside();
      }
    };

    useEffect(() => {
      resizeObserver.current = new ResizeObserver(() => positionAside());
      resizeObserver.current.observe(document.body);
      return () => {
        resizeObserver.current?.disconnect();
      };
    }, []);

    useEffect(() => {
      if (theme.darkMode) {
        document.body.style.backgroundColor = '#000';
      } else {
        document.body.style.backgroundColor = '#fff';
      }
    }, [theme.darkMode]);

    useEffect(() => {
      if (asideValue.isOpen) {
        setOpenAside(true);
      }
    }, [asideValue]);

    const toggleOpen = useCallback(() => setOpenAside(prev => !prev), []);

    const canRenderAside = useMemo(() => {
      return media && media.isMobile && openAside && !isLanding;
    }, [media, openAside, isLanding]);

    const onClose = useCallback(() => {
      setOpenAside(false);
      setAsideValue({ isAnyOverlayOpen: false, isOpen: false });
    }, []);

    const onSelect = () => {
      setOpenAside(false);
    };

    const appClass = useMemo(
      () =>
        classNames(
          'app',
          theme.darkMode ? 'dark' : '',
          isLanding ? 'is-landing' : ''
        ),
      [theme.darkMode, isLanding]
    );

    return (
      <div className={appClass} ref={onAppRef}>
        {media && !media.isMobile && !isLanding && (
          <aside
            className={sidebarClass}
            ref={asideRef}
            style={{ left: `${left}px` }}
          >
            <SidebarHome />
          </aside>
        )}
        {canRenderAside && (
          <Drawer onClose={onClose} focusable={false}>
            <SidebarHome onSelect={onSelect} />
          </Drawer>
        )}
        <AppMain media={media} toggleOpen={toggleOpen} ref={sectionRef} />
      </div>
    );
  },
  (prev, next) => {
    return deepEqual(prev.media, next.media);
  }
);

App.displayName = 'App';

export default App;
