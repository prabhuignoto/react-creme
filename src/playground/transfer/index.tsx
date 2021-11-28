import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function transfer() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[]}
      tabTitles={["Transfer", "Properties"]}
    ></DemoPageRenderer>
  );
}

export default transfer;
