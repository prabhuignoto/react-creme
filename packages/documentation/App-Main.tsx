import deepEqual from 'fast-deep-equal';
import React, { Suspense, useImperativeHandle, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import AppRoutes from './app-routes';
import { MediaState } from './atoms/home';
import Footer from './home/footer/footer';
import { Header } from './home/header';

const Main = React.forwardRef<
  { getBoundingClientRect: () => DOMRect },
  { media: MediaState; toggleOpen: () => void }
>(({ media, toggleOpen }, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => {
    if (sectionRef.current) {
      return {
        getBoundingClientRect: () => sectionRef.current.getBoundingClientRect(),
      };
    }
  });

  const canShowHeader = useMemo(
    () => location.pathname !== '/' && location.pathname !== '/home',
    [location.pathname]
  );

  return (
    <section className="app-main-section" ref={sectionRef}>
      {canShowHeader && (
        <Header
          isMobile={media && media.isMobile}
          onOpen={toggleOpen}
          onSearchSelection={path => navigate(path.value)}
        />
      )}
      <Suspense fallback={<span></span>}>
        <AppRoutes />
      </Suspense>
      <Footer />
    </section>
  );
});

const MainMemoized = React.memo(Main, (prev, next) =>
  deepEqual(prev.media, next.media)
);

Main.displayName = 'Main';

export { MainMemoized as AppMain };
