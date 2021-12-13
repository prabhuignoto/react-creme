import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import "./draggable.scss";
import Widgets from "./widgets";

function Draggable() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Draggable"
      description="React Hook to enable draggable functionality"
      data={[]}
      tabTitles={["draggable"]}
    ></DemoPageRenderer>
  );
}

export default Draggable;
