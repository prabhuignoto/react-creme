import classNames from 'classnames';
import fastDeepEqual from 'fast-deep-equal';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { useLocation } from 'react-router';
import AppRoutes from './app-routes';
import { MediaState } from './atoms/home';
import Footer from './home/footer/footer';

const Main = React.forwardRef<
  { getBoundingClientRect: () => DOMRect | undefined },
  { media: MediaState; toggleOpen: () => void }
>(({ media: _media, toggleOpen: _toggleOpen }, ref) => {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <main
      className={classNames('app-main-section', isLanding ? 'is-landing' : '')}
      ref={sectionRef}
    >
      <AppRoutes />
      <Footer />
    </main>
  );
});

const MainMemoized = React.memo(Main, (prev, next) =>
  fastDeepEqual(prev.media, next.media)
);

Main.displayName = 'Main';

MainMemoized.displayName = 'Main';

export { MainMemoized as AppMain };
