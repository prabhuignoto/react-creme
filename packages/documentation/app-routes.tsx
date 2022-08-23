import classNames from 'classnames';
import { Suspense, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { TransitionGroup } from 'react-transition-group';
import './app-routes.scss';
import { routes } from './route-configs/route-configs-1';

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
      <Suspense fallback={<div></div>}>
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
