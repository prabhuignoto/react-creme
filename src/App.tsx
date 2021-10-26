import React, { useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useTimer } from "use-timer";
import "./App.css";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import Breadcrumb from "./playground/breadcrumb";
import Buttons from "./playground/buttons";
import Carousel from "./playground/carousel";
import Comparer from "./playground/comparer";
import Dialog from "./playground/dialog";
import Drawer from "./playground/drawer";
import Dropdown from "./playground/dropdown";
import Inputs from "./playground/inputs";
import List from "./playground/list";
import Menu from "./playground/menu";
import MenuBar from "./playground/menubar";
import Notification from "./playground/notification";
import Progress from "./playground/progress";
import Skeleton from "./playground/skeleton";
import Slider from "./playground/slider";
import Splitter from "./playground/splitter";
import Tabs from "./playground/tabs";
import Tags from "./playground/tags";
import Tooltip from "./playground/tooltip";
import Transfer from "./playground/transfer";
import Tree from "./playground/tree";

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
        <Link to="/dropdown">Dropdown</Link>
        <Link to="/list">List</Link>
        <Link to="/tags">Tags</Link>
        <Link to="/tooltip">Tooltip</Link>
        <Link to="/transfer">Transfer</Link>
        <Link to="/menubar">MenuBar</Link>
        <Link to="/carousel">Carousel</Link>
        <Link to="/splitter">Splitter</Link>
        <Link to="/tree">tree</Link>
        <Link to="/buttons">buttons</Link>
        <Link to="/menu">menu</Link>
        <Link to="/inputs">inputs</Link>
        <Link to="/notification">notification</Link>
        <Link to="/breadcrumb">breadcrumb</Link>
        <Link to="/progress">progress</Link>
        <Link to="/drawer">drawer</Link>
        <Link to="/dialog">dialog</Link>
        <Link to="/slider">slider</Link>
        <Link to="/comparer">comparer</Link>
        <Link to="/skeleton">skeleton</Link>
        <Link to="/tabs">tabs</Link>
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
        </Routes>
      </section>

      <div style={{ width: "70vw", height: "950px" }}></div>
    </div>
  );
}

export default App;
