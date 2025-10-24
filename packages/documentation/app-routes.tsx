import classNames from 'classnames';
import { Suspense, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { TransitionGroup } from 'react-transition-group';
import './app-routes.scss';
import { routes } from './route-configs/route-configs-1';

/**
 * Loading placeholder that maintains minimum height to prevent footer from appearing mid-page
 */
function LoadingPlaceholder() {
  return (
    <div className="route-loading-placeholder">
      <div className="loading-skeleton">
        {/* Skeleton for page header */}
        <div className="skeleton-header" />
        {/* Skeleton for content */}
        <div className="skeleton-content" />
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();

  const isLanding = useMemo(() => {
    return location.pathname === '/landing';
  }, [location.pathname]);

  const contentClass = useMemo(
    () =>
      classNames(
        'section-content',
        location.pathname === '/' ? 'home' : '',
        isLanding ? 'is-landing' : ''
      ),
    [location]
  );

  return (
    <TransitionGroup style={{ width: '100%' }}>
      {/* <CSSTransition key={location.pathname} classNames="fade" timeout={200}> */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <Routes>
          {routes.map(({ key, path, component }) => {
            const Component = component;
            return (
              <Route
                key={key}
                path={path}
                element={
                  <div className={contentClass}>
                    <Component />
                  </div>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
      {/* </CSSTransition> */}
    </TransitionGroup>
  );
}

export default AppRoutes;
