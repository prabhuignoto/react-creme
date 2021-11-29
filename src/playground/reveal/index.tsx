import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function reveal() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[]}
      tabTitles={["Reveal", "properties"]}
    ></DemoPageRenderer>
  );
}

export default reveal;
