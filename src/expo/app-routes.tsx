import React from "react";
import { Route, Routes } from "react-router";
import { routes } from "./route-configs";

function AppRoutes() {
  return (
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
  );
}

export default AppRoutes;
