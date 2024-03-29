import classNames from 'classnames';
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
    <section
      className={classNames('app-main-section', isLanding ? 'is-landing' : '')}
      ref={sectionRef}
    >
      {/* {canShowHeader && ( */}
      <Header
        isMobile={media && media.isMobile}
        onOpen={toggleOpen}
        onSearchSelection={path => navigate(path.value)}
      />
      {/* )} */}
      <AppRoutes />
      <Footer />
    </section>
  );
});

const MainMemoized = React.memo(
  Main,
  (prev, next) => JSON.stringify(prev.media) === JSON.stringify(next.media)
);

Main.displayName = 'Main';

MainMemoized.displayName = 'Main';

export { MainMemoized as AppMain };
