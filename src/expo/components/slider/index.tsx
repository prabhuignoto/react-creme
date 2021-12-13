import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import { Widgets } from "./widgets";

function slider() {
  return (
    <DemoPageRenderer
      data={[]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
      title="Slider"
      description="Slider is a component that allows you to select a value from a range of values."
    ></DemoPageRenderer>
  );
}

export default slider;
