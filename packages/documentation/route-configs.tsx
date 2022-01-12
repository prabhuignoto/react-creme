import React, { lazy } from "react";
import { routes as otherRoutes } from "./route-configs-2";

const routes = [
  ...otherRoutes,
  {
    path: "/home",
    key: "home",
    component: React.lazy(() => import("./home")),
  },
  {
    path: "/",
    key: "home",
    component: lazy(() => import("./home")),
  },
  {
    path: "/accordion",
    key: "accordion",
    component: lazy(() => import("./components/accordion")),
  },
  {
    path: "/accordion-group",
    key: "accordion-group",
    component: lazy(() => import("./components/accordion-group")),
  },
  {
    path: "/alerts",
    key: "alerts",
    component: lazy(() => import("./components/alerts")),
  },
  {
    path: "/autocomplete",
    key: "auto-complete",
    component: lazy(() => import("./components/auto-complete")),
  },
  {
    path: "/breadcrumb",
    key: "breadcrumb",
    component: lazy(() => import("./components/breadcrumb")),
  },
  {
    path: "/button",
    key: "buttons",
    component: lazy(() => import("./components/buttons")),
  },
  {
    path: "/card",
    key: "card",
    component: lazy(() => import("./components/card")),
  },
  {
    path: "/carousel",
    key: "carousel",
    component: lazy(() => import("./components/carousel")),
  },
  {
    path: "/checkbox",
    key: "checkbox",
    component: lazy(() => import("./components/checkbox")),
  },
  {
    path: "/checkbox-group",
    key: "checkbox-group",
    component: lazy(() => import("./components/checkbox-group")),
  },
  {
    path: "/image-comparer",
    key: "comparer",
    component: lazy(() => import("./components/comparer")),
  },
  {
    path: "/data-grid",
    key: "data-grid",
    component: lazy(() => import("./components/data-grid")),
  },
  {
    path: "/dialog",
    key: "dialog",
    component: lazy(() => import("./components/dialog")),
  },
  {
    path: "/draggable",
    key: "draggable",
    component: React.lazy(() => import("./components/draggable")),
  },
  {
    path: "/drawer",
    key: "drawer",
    component: React.lazy(() => import("./components/drawer")),
  },
  {
    path: "/dropdown",
    key: "dropdown",
    component: React.lazy(() => import("./components/dropdown")),
  },
  {
    path: "/page-header",
    key: "page-header",
    component: React.lazy(() => import("./components/page-header")),
  },
];

export { routes };
