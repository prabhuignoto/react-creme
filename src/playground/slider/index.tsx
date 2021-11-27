import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import { Widgets } from "./widgets";

function slider() {
  return (
    <DemoPageRenderer
      data={[]}
      tabTitles={["sliders", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default slider;