import React from "react";
import { Route, Routes } from "react-router";
import Accordion from "./components/accordion";
import Alert from "./components/alerts";
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
import AccordionGroup from "./components/accordion-group";
import AutoComplete from "./components/auto-complete";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="section-content">
            <Accordion />
          </div>
        }
      />
      <Route
        path="/dropdown"
        element={
          <div className="section-content">
            <Dropdown />
          </div>
        }
      />
      <Route
        path="/list"
        element={
          <div className="section-content">
            <List />
          </div>
        }
      />
      <Route
        path="/tags"
        element={
          <div className="section-content">
            <Tags />
          </div>
        }
      />
      <Route
        path="/tooltip"
        element={
          <div className="section-content">
            <Tooltip />
          </div>
        }
      />
      <Route
        path="/notification"
        element={
          <div className="section-content">
            <Notification />
          </div>
        }
      />
      <Route
        path="/transfer"
        element={
          <div className="section-content">
            <Transfer />
          </div>
        }
      />
      <Route
        path="/breadcrumb"
        element={
          <div className="section-content">
            <Breadcrumb />
          </div>
        }
      />
      <Route
        path="/menu"
        element={
          <div className="section-content" style={{}}>
            <Menu />
          </div>
        }
      />
      <Route
        path="/input-text"
        element={
          <div className="section-content">
            <Inputs />
          </div>
        }
      />
      <Route
        path="/button"
        element={
          <div className="section-content">
            <Buttons />
          </div>
        }
      />
      <Route
        path="/tree"
        element={
          <div className="section-content">
            <Tree />
          </div>
        }
      />
      <Route
        path="/carousel"
        element={
          <div className="section-content">
            <Carousel />
          </div>
        }
      />
      <Route
        path="/splitter"
        element={
          <div className="section-content">
            <Splitter />
          </div>
        }
      />
      <Route
        path="/menu-bar"
        element={
          <div className="section-content">
            <MenuBar />
          </div>
        }
      />
      <Route
        path="/progress"
        element={
          <div className="section-content">
            <Progress />
          </div>
        }
      />
      <Route
        path="/drawer"
        element={
          <div className="section-content">
            <Drawer />
          </div>
        }
      />
      <Route
        path="/dialog"
        element={
          <div className="section-content">
            <Dialog />
          </div>
        }
      />
      <Route
        path="/slider"
        element={
          <div className="section-content">
            <Slider />
          </div>
        }
      />
      <Route
        path="/image-comparer"
        element={
          <div className="section-content">
            <Comparer />
          </div>
        }
      />
      <Route
        path="/skeleton"
        element={
          <div className="section-content">
            <Skeleton />
          </div>
        }
      />
      <Route
        path="/tabs"
        element={
          <div className="section-content">
            <Tabs />
          </div>
        }
      />
      <Route
        path="/accordion"
        element={
          <div className="section-content">
            <Accordion />
          </div>
        }
      />
      <Route
        path="/accordion-group"
        element={
          <div className="section-content">
            <AccordionGroup />
          </div>
        }
      />
      <Route
        path="/rate"
        element={
          <div className="section-content">
            <Rate />
          </div>
        }
      />
      <Route
        path="/radio"
        element={
          <div className="section-content">
            <Radio />
          </div>
        }
      />
      <Route
        path="/switch"
        element={
          <div className="section-content">
            <Switch />
          </div>
        }
      />
      <Route
        path="/checkbox"
        element={
          <div className="section-content">
            <Checkbox />
          </div>
        }
      />
      <Route
        path="/radio-group"
        element={
          <div className="section-content">
            <RadioGroup />
          </div>
        }
      />
      <Route
        path="/card"
        element={
          <div className="section-content">
            <Card />
          </div>
        }
      />
      <Route
        path="/splitter"
        element={
          <div className="section-content">
            <Card />
          </div>
        }
      />
      <Route
        path="/menu-button"
        element={
          <div className="section-content">
            <MenuButton />
          </div>
        }
      />
      <Route
        path="/avatar"
        element={
          <div className="section-content">
            <Avatar />
          </div>
        }
      />
      <Route
        path="/data-grid"
        element={
          <div className="section-content">
            <DataGrid />
          </div>
        }
      />
      <Route
        path="/image"
        element={
          <div className="section-content">
            <Image />
          </div>
        }
      />
      <Route
        path="/sidebar"
        element={
          <div className="section-content">
            <Sidebar />
          </div>
        }
      />
      <Route
        path="/reveal"
        element={
          <div className="section-content">
            <Reveal />
          </div>
        }
      />
      <Route
        path="/scroll-spy"
        element={
          <div className="section-content">
            <ScrollSpy />
          </div>
        }
      />
      <Route
        path="/section"
        element={
          <div className="section-content">
            <Section />
          </div>
        }
      />
      <Route
        path="/draggable"
        element={
          <div className="section-content">
            <Draggable />
          </div>
        }
      />
      <Route
        path="/global-notification"
        element={
          <div className="section-content">
            <GlobalNotification />
          </div>
        }
      />
      <Route
        path="/alerts"
        element={
          <div className="section-content">
            <Alert />
          </div>
        }
      />
      <Route
        path="/checkbox-group"
        element={
          <div className="section-content">
            <CheckboxGroup />
          </div>
        }
      />
      <Route
        path="/autocomplete"
        element={
          <div className="section-content">
            <AutoComplete />
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
