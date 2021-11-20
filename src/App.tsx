import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useTimer } from "use-timer";
import "./App.css";
import { Sidebar } from "./demo/sidebar/sidebar";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import Accordion from "./playground/accordion";
import AccordionGroup from "./playground/accordion-group";
import Avatar from "./playground/avatar";
import Breadcrumb from "./playground/breadcrumb";
import Buttons from "./playground/buttons";
import Card from "./playground/card";
import Carousel from "./playground/carousel";
import Checkbox from "./playground/checkbox";
import Comparer from "./playground/comparer";
import Dialog from "./playground/dialog";
import Drawer from "./playground/drawer";
import Dropdown from "./playground/dropdown";
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
import Skeleton from "./playground/skeleton";
import Slider from "./playground/slider";
import Splitter from "./playground/splitter";
import Switch from "./playground/switch";
import Tabs from "./playground/tabs";
import Tags from "./playground/tags";
import Tooltip from "./playground/tooltip";
import Transfer from "./playground/transfer";
import Tree from "./playground/tree";
import DataGrid from "./playground/data-grid";
import Image from "./playground/image";

function App() {
  const { time, start, pause, reset, status } = useTimer({
    endTime: 40,
    interval: 100,
  });

  const [open, setOpen] = useState(false);
  const ref = useRef();

  return (
    <div className="App">
      <aside className="aside">
        <Sidebar />
      </aside>
      <section className="section">
        <Routes>
          <Route
            path="/dropdown"
            element={
              <div className="section-content" style={{ minWidth: "350px" }}>
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
            path="/inputs"
            element={
              <div className="section-content">
                <Inputs />
              </div>
            }
          />
          <Route
            path="/buttons"
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
              <div className="section-content" style={{ width: "650px" }}>
                <Carousel />
              </div>
            }
          />
          <Route
            path="/splitter"
            element={
              <div className="section-content" style={{ width: "850px" }}>
                <Splitter />
              </div>
            }
          />
          <Route
            path="/menubar"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <MenuBar />
              </div>
            }
          />
          <Route
            path="/progress"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <Progress />
              </div>
            }
          />
          <Route
            path="/drawer"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <Drawer />
              </div>
            }
          />
          <Route
            path="/dialog"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <Dialog />
              </div>
            }
          />
          <Route
            path="/slider"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <Slider />
              </div>
            }
          />
          <Route
            path="/comparer"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <Comparer />
              </div>
            }
          />
          <Route
            path="/skeleton"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <Skeleton />
              </div>
            }
          />
          <Route
            path="/tabs"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <Tabs />
              </div>
            }
          />
          <Route
            path="/accordion"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <Accordion />
              </div>
            }
          />
          <Route
            path="/accordion-group"
            element={
              <div className="section-content" style={{ width: "600px" }}>
                <AccordionGroup />
              </div>
            }
          />
          <Route
            path="/scrollpane"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <ScrollPane />
              </div>
            }
          />
          <Route
            path="/rate"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <Rate />
              </div>
            }
          />
          <Route
            path="/radio"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <Radio />
              </div>
            }
          />
          <Route
            path="/switch"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <Switch />
              </div>
            }
          />
          <Route
            path="/checkbox"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <Checkbox />
              </div>
            }
          />
          <Route
            path="/radio-group"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <RadioGroup />
              </div>
            }
          />
          <Route
            path="/card"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <Card />
              </div>
            }
          />
          <Route
            path="/splitter"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <Card />
              </div>
            }
          />
          <Route
            path="/menu-button"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <MenuButton />
              </div>
            }
          />
          <Route
            path="/avatar"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <Avatar />
              </div>
            }
          />
          <Route
            path="/data-grid"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <DataGrid />
              </div>
            }
          />
          <Route
            path="/image"
            element={
              <div className="section-content" style={{ width: "900px" }}>
                <Image />
              </div>
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default App;
