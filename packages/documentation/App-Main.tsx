import classNames from 'classnames';
import fastDeepEqual from 'fast-deep-equal';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AppRoutes from './app-routes';
import { MediaState } from './atoms/home';
import Footer from './home/footer/footer';
import { Header } from './home/header';

const Main = React.forwardRef<
  { getBoundingClientRect: () => DOMRect | undefined },
  { media: MediaState; toggleOpen: () => void }
>(({ media, toggleOpen }, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const location = useLocation();

  const isLanding = useMemo(
    () => location.pathname === '/landing' || location.pathname === '/',
    [location]
  );

  useImperativeHandle(ref, () => {
    return {
      getBoundingClientRect: () => sectionRef.current?.getBoundingClientRect(),
    };
  });

  // const canShowHeader = useMemo(
  //   () => location.pathname !== '/' && location.pathname !== '/home',
  //   [location.pathname]
  // );

  return (
    <main
      className={classNames('app-main-section', isLanding ? 'is-landing' : '')}
      ref={sectionRef}
    >
      {!isLanding && (
        <Header
          isMobile={media && media.isMobile}
          onOpen={toggleOpen}
          onSearchSelection={path => navigate(path.value)}
        />
      )}
      <AppRoutes />
      <Footer />
    </main>
  );
});

const MainMemoized = React.memo(
  Main,
  (prev, next) => fastDeepEqual(prev.media, next.media) && prev.toggleOpen === next.toggleOpen
);

Main.displayName = 'Main';

MainMemoized.displayName = 'Main';

export { MainMemoized as AppMain };
