import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function skeleton() {
  return (
    <DemoPageRenderer
      data={[]}
      tabTitles={["Skeleton", "Properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default skeleton;
