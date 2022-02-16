import classNames from 'classnames';
import deepEqual from 'fast-deep-equal';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';
import ResizeObserver from 'resize-observer-polyfill';
import { Drawer } from '../lib/components';
import '../lib/design/core.scss';
import '../lib/design/list.scss';
import '../lib/design/theme.scss';
import { AppMain } from './App-Main';
import './App.scss';
import { asideState, MediaState } from './atoms/home';
import SidebarHome from './home/sidebar-home';

const App: React.FunctionComponent<{ media: MediaState }> = React.memo(
  ({ media }: { media: MediaState }) => {
    const sectionRef = useRef(null);
    const asideRef = useRef<HTMLElement>(null);
    const [left, setLeft] = React.useState(-1);
    const resizeObserver = useRef<ResizeObserver>();

    const [asideValue, setAsideValue] = useRecoilState(asideState);

    const appRef = useRef<HTMLDivElement>(null);
    const [openAside, setOpenAside] = React.useState(false);

    const sidebarClass = useMemo(() => {
      return classNames('app-aside', {
        'app-aside-visible': left > -1,
      });
    }, [left]);

    const positionAside = useCallback(() => {
      if (sectionRef.current && asideRef.current && !media.isMobile) {
        const asideWidth = asideRef.current.offsetWidth;
        const { left: sectionLeft } =
          sectionRef.current.getBoundingClientRect();
        if (sectionLeft - asideWidth > 0) {
          setLeft(sectionLeft - asideWidth);
        } else {
          setLeft(0);
        }
      }
    }, [media]);

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
        resizeObserver.current.disconnect();
      };
    }, []);

    useEffect(() => {
      if (asideValue.isOpen) {
        setOpenAside(true);
      }
    }, [asideValue]);

    const toggleOpen = useCallback(() => setOpenAside(prev => !prev), []);

    const canRenderAside = useMemo(() => {
      return media && media.isMobile && openAside;
    }, [media, openAside]);

    const onClose = useCallback(() => {
      setOpenAside(false);
      setAsideValue({ isAnyOverlayOpen: false, isOpen: false });
    }, []);

    const onSelect = () => {
      setOpenAside(false);
    };

    return (
      <div className="app" ref={onAppRef}>
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
          <Drawer onClose={onClose} showClose focusable={false}>
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
