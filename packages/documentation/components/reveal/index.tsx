import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function reveal() {
  return (
    <DemoPageRenderer
      title="Reveal"
      description="Reveals content when a user scrolls to it."
      demoWidget={lazy(() => import("./widgets"))}
      properties={[]}
      tabTitles={["Examples", "Properties", "Type definitions", "Stackblitz"]}
    ></DemoPageRenderer>
  );
}

export default reveal;
