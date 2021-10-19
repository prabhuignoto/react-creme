import React, { useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useTimer } from "use-timer";
import "./App.css";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import Breadcrumb from "./test/breadcrumb";
import Buttons from "./test/buttons";
import Carousel from "./test/carousel";
import Dialog from "./test/dialog";
import Drawer from "./test/drawer";
import Dropdown from "./test/dropdown";
import Inputs from "./test/inputs";
import List from "./test/list";
import Menu from "./test/menu";
import MenuBar from "./test/menubar";
import Notification from "./test/notification";
import Progress from "./test/progress";
import Slider from "./test/slider";
import Splitter from "./test/splitter";
import Tags from "./test/tags";
import Tooltip from "./test/tooltip";
import Transfer from "./test/transfer";
import Tree from "./test/tree";

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
              <div
                className="section-content"
                style={{ minWidth: "200px", border: "1px solid #000" }}
              >
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
        </Routes>
      </section>

      <div style={{ width: "70vw", height: "950px" }}>
        {/* <ImageComparer>
          <img src="https://images.unsplash.com/photo-1633993365492-0828ece5c0ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80" />
          <img src="https://images.unsplash.com/photo-1633993365492-0828ece5c0ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80" />
        </ImageComparer> */}
      </div>
    </div>
  );
}

export default App;
