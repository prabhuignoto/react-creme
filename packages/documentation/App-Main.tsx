import deepEqual from 'fast-deep-equal';
import React, { Suspense, useImperativeHandle, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ThemeProvider } from '../lib/components/common/theme-provider';
import AppRoutes from './app-routes';
import { MediaState } from './atoms/home';
import Footer from './common/footer';
import { Header } from './common/header';

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

  return (
    <section className="app-main-section" ref={sectionRef}>
      {location.pathname !== '/' && (
        <Header
          isMobile={media && media.isMobile}
          onOpen={toggleOpen}
          onSearchSelection={path => navigate(path.value)}
        />
      )}
      <Suspense fallback={<span></span>}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
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