import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { TransitionGroup } from 'react-transition-group';
import './app-routes.scss';
import { routes } from './route-configs/route-configs-1';

function AppRoutes() {
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
                  <div className="section-content">
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
