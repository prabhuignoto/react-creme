import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import "./draggable.scss";

function Draggable() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
      title="Draggable"
      description="React Hook to enable draggable functionality"
      data={[]}
      tabTitles={["draggable"]}
    ></DemoPageRenderer>
  );
}

export default Draggable;
