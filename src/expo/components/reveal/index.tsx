import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function reveal() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default reveal;
