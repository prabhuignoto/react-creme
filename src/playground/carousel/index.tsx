import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function carousel() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[]}
      tabTitles={["carousel", "properties"]}
    ></DemoPageRenderer>
  );
}

export default carousel;
