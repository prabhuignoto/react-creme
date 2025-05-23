import classNames from 'classnames';
import { Suspense, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { TransitionGroup } from 'react-transition-group';
import { LoadingIndicator } from '../lib/components';
import { routes } from './route-configs/route-configs-1';
import './app-routes.scss';

// Custom loading component with minimal UI for faster initial render
const PageLoader = () => (
  <div className="page-loader">
    <LoadingIndicator />
  </div>
);

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
      <div className={contentClass}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {routes.map(({ key, path, component: Component }) => (
              <Route
                key={key}
                path={path}
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </Suspense>
      </div>
    </TransitionGroup>
  );
}

export default AppRoutes;
