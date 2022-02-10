import React from 'react';
import { Route, Routes } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './app-routes.scss';
import { routes } from './route-configs/route-configs-1';

function AppRoutes() {
  return (
    <TransitionGroup style={{ width: '100%' }}>
      <CSSTransition key={location.pathname} classNames="fade" timeout={200}>
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
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AppRoutes;
