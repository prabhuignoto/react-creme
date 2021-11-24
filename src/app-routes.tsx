import React from "react";
import { Route, Routes } from "react-router";
import Accordion from "./playground/accordion";
import AccordionGroup from "./playground/accordion-group";
import Avatar from "./playground/avatar";
import Breadcrumb from "./playground/breadcrumb";
import Buttons from "./playground/buttons";
import Card from "./playground/card";
import Carousel from "./playground/carousel";
import Checkbox from "./playground/checkbox";
import Comparer from "./playground/comparer";
import DataGrid from "./playground/data-grid";
import Dialog from "./playground/dialog";
import Drawer from "./playground/drawer";
import Dropdown from "./playground/dropdown";
import Image from "./playground/image";
import Inputs from "./playground/inputs";
import List from "./playground/list";
import Menu from "./playground/menu";
import MenuButton from "./playground/menu-button";
import MenuBar from "./playground/menubar";
import Notification from "./playground/notification";
import Progress from "./playground/progress";
import Radio from "./playground/radio";
import RadioGroup from "./playground/radio-group";
import Rate from "./playground/rate";
import ScrollPane from "./playground/ScrollPane";
import Sidebar from "./playground/sidebar";
import Skeleton from "./playground/skeleton";
import Slider from "./playground/slider";
import Splitter from "./playground/splitter";
import Switch from "./playground/switch";
import Tabs from "./playground/tabs";
import Tags from "./playground/tags";
import Tooltip from "./playground/tooltip";
import Transfer from "./playground/transfer";
import Tree from "./playground/tree";

function AppRoutes() {
  return (
    <Routes>
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
        path="/comparer"
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
        path="/scrollpane"
        element={
          <div className="section-content">
            <ScrollPane />
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
    </Routes>
  );
}

export default AppRoutes;
