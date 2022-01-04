import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function reveal() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
      data={[]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default reveal;
