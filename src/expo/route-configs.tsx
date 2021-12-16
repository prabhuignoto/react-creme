import React from "react";
import Accordion from "./components/accordion";
import AccordionGroup from "./components/accordion-group";
import Alert from "./components/alerts";
import AutoComplete from "./components/auto-complete";
import Avatar from "./components/avatar";
import Breadcrumb from "./components/breadcrumb";
import Buttons from "./components/buttons";
import Card from "./components/card";
import Carousel from "./components/carousel";
import Checkbox from "./components/checkbox";
import CheckboxGroup from "./components/checkbox-group";
import Comparer from "./components/comparer";
import DataGrid from "./components/data-grid";
import Dialog from "./components/dialog";
import Draggable from "./components/draggable";
import Drawer from "./components/drawer";
import Dropdown from "./components/dropdown";
import { routes as otherRoutes } from "./route-configs-2";

const routes = [
  ...otherRoutes,
  {
    path: "/",
    key: "home",
    component: <span></span>,
  },
  {
    path: "/accordion",
    key: "accordion",
    component: <Accordion />,
  },
  {
    path: "/accordion-group",
    key: "accordion-group",
    component: <AccordionGroup />,
  },
  {
    path: "/alerts",
    key: "alerts",
    component: <Alert />,
  },
  {
    path: "/autocomplete",
    key: "auto-complete",
    component: <AutoComplete />,
  },
  {
    path: "/avatar",
    key: "avatar",
    component: <Avatar />,
  },
  {
    path: "/breadcrumb",
    key: "breadcrumb",
    component: <Breadcrumb />,
  },
  {
    path: "/button",
    key: "buttons",
    component: <Buttons />,
  },
  {
    path: "/card",
    key: "card",
    component: <Card />,
  },
  {
    path: "/carousel",
    key: "carousel",
    component: <Carousel />,
  },
  {
    path: "/checkbox",
    key: "checkbox",
    component: <Checkbox />,
  },
  {
    path: "/checkbox-group",
    key: "checkbox-group",
    component: <CheckboxGroup />,
  },
  {
    path: "/image-comparer",
    key: "comparer",
    component: <Comparer />,
  },
  {
    path: "/data-grid",
    key: "data-grid",
    component: <DataGrid />,
  },
  {
    path: "/dialog",
    key: "dialog",
    component: <Dialog />,
  },
  {
    path: "/draggable",
    key: "draggable",
    component: <Draggable />,
  },
  {
    path: "/drawer",
    key: "drawer",
    component: <Drawer />,
  },
  {
    path: "/dropdown",
    key: "dropdown",
    component: <Dropdown />,
  },
];

export { routes };
