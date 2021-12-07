import React, { CSSProperties } from "react";
import { Sortable } from "../../components/sortable/sortable";
import DemoPageRenderer from "../demo-page-renderer";

const style = {
  width: "250px",
  height: "150px",
  background: "#ccc",
} as CSSProperties;

const Widget = () => (
  <Sortable>
    <div style={style}></div>
    <div style={style}></div>
    <div style={style}></div>
  </Sortable>
);

function index() {
  return (
    <DemoPageRenderer
      demoWidget={<Widget />}
      title="Sortable"
      data={[]}
      tabTitles={["Examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default index;
