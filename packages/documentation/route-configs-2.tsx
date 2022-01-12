import { lazy } from "react";

export const routes = [
  {
    path: "/global-notification",
    key: "global-notification",
    component: lazy(() => import("./components/global-notification")),
  },
  {
    path: "/image",
    key: "image",
    component: lazy(() => import("./components/image")),
  },
  {
    path: "/input-text",
    key: "input",
    component: lazy(() => import("./components/input")),
  },
  {
    path: "/list",
    key: "list",
    component: lazy(() => import("./components/list")),
  },
  {
    path: "/menu",
    key: "menu",
    component: lazy(() => import("./components/menu")),
  },
  {
    path: "/menu-button",
    key: "menu-button",
    component: lazy(() => import("./components/menu-button")),
  },
  {
    path: "/notification",
    key: "notification",
    component: lazy(() => import("./components/notification")),
  },
  {
    path: "/progress",
    key: "progress",
    component: lazy(() => import("./components/progress")),
  },
  {
    path: "/radio",
    key: "radio",
    component: lazy(() => import("./components/radio")),
  },
  {
    path: "/radio-group",
    key: "radio-group",
    component: lazy(() => import("./components/radio-group")),
  },
  {
    path: "/rate",
    key: "rate",
    component: lazy(() => import("./components/rate")),
  },
  {
    path: "/reveal",
    key: "reveal",
    component: lazy(() => import("./components/reveal")),
  },
  {
    path: "/scroll-spy",
    key: "scroll-spy",
    component: lazy(() => import("./components/scroll-spy")),
  },
  {
    path: "/section",
    key: "section",
    component: lazy(() => import("./components/section")),
  },
  {
    path: "/sidebar",
    key: "sidebar",
    component: lazy(() => import("./components/sidebar")),
  },
  {
    path: "/skeleton",
    key: "skeleton",
    component: lazy(() => import("./components/skeleton")),
  },
  {
    path: "/slider",
    key: "slider",
    component: lazy(() => import("./components/slider")),
  },
  {
    path: "/splitter",
    key: "splitter",
    component: lazy(() => import("./components/splitter")),
  },
  {
    path: "/switch",
    key: "switch",
    component: lazy(() => import("./components/switch")),
  },
  {
    path: "/tabs",
    key: "tabs",
    component: lazy(() => import("./components/tabs")),
  },
  {
    path: "/tags",
    key: "tags",
    component: lazy(() => import("./components/tags")),
  },
  {
    path: "/tooltip",
    key: "tooltip",
    component: lazy(() => import("./components/tooltip")),
  },
  {
    path: "/transfer",
    key: "transfer",
    component: lazy(() => import("./components/transfer")),
  },
  {
    path: "/tree",
    key: "tree",
    component: lazy(() => import("./components/tree")),
  },
];
