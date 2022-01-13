import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import "./draggable.scss";

function Draggable() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
      title="Draggable"
      description="React Hook to enable draggable functionality"
      properties={[]}
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-re75pw"]}
    ></DemoPageRenderer>
  );
}

export default Draggable;
