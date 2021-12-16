import React from "react";
import GlobalNotification from "./components/global-notification";
import Image from "./components/image";
import Inputs from "./components/input";
import List from "./components/list";
import Menu from "./components/menu";
import MenuButton from "./components/menu-button";
import MenuBar from "./components/menubar";
import Notification from "./components/notification";
import Progress from "./components/progress";
import Radio from "./components/radio";
import RadioGroup from "./components/radio-group";
import Rate from "./components/rate";
import Reveal from "./components/reveal";
import ScrollSpy from "./components/scroll-spy";
import Section from "./components/section";
import Sidebar from "./components/sidebar";
import Skeleton from "./components/skeleton";
import Slider from "./components/slider";
import Splitter from "./components/splitter";
import Switch from "./components/switch";
import Tabs from "./components/tabs";
import Tags from "./components/tags";
import Tooltip from "./components/tooltip";
import Transfer from "./components/transfer";
import Tree from "./components/tree";

export const routes = [
  {
    path: "/global-notification",
    key: "global-notification",
    component: <GlobalNotification />,
  },
  {
    path: "/image",
    key: "image",
    component: <Image />,
  },
  {
    path: "/input-text",
    key: "input",
    component: <Inputs />,
  },
  {
    path: "/list",
    key: "list",
    component: <List />,
  },
  {
    path: "/menu",
    key: "menu",
    component: <Menu />,
  },
  {
    path: "/menu-button",
    key: "menu-button",
    component: <MenuButton />,
  },
  {
    path: "/menu-bar",
    key: "menubar",
    component: <MenuBar />,
  },
  {
    path: "/notification",
    key: "notification",
    component: <Notification />,
  },
  {
    path: "/progress",
    key: "progress",
    component: <Progress />,
  },
  {
    path: "/radio",
    key: "radio",
    component: <Radio />,
  },
  {
    path: "/radio-group",
    key: "radio-group",
    component: <RadioGroup />,
  },
  {
    path: "/rate",
    key: "rate",
    component: <Rate />,
  },
  {
    path: "/reveal",
    key: "reveal",
    component: <Reveal />,
  },
  {
    path: "/scroll-spy",
    key: "scroll-spy",
    component: <ScrollSpy />,
  },
  {
    path: "/section",
    key: "section",
    component: <Section />,
  },
  {
    path: "/sidebar",
    key: "sidebar",
    component: <Sidebar />,
  },
  {
    path: "/skeleton",
    key: "skeleton",
    component: <Skeleton />,
  },
  {
    path: "/slider",
    key: "slider",
    component: <Slider />,
  },
  {
    path: "/splitter",
    key: "splitter",
    component: <Splitter />,
  },
  {
    path: "/switch",
    key: "switch",
    component: <Switch />,
  },
  {
    path: "/tabs",
    key: "tabs",
    component: <Tabs />,
  },
  {
    path: "/tags",
    key: "tags",
    component: <Tags />,
  },
  {
    path: "/tooltip",
    key: "tooltip",
    component: <Tooltip />,
  },
  {
    path: "/transfer",
    key: "transfer",
    component: <Transfer />,
  },
  {
    path: "/tree",
    key: "tree",
    component: <Tree />,
  },
];
