import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function carousel() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Carousel"
      description="Carousel is a component that displays a list of items in a carousel."
      data={[
        {
          name: "<em>direction</em>",
          description: "prop to set the navigation direction of the carousel",
          default: "<em>horizontal</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>height</em>",
          description: "sets the height of the carousel",
          default: "<em>400</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>transition</em>",
          description: "prop to set custom transition animation",
          default: "<em>cubic-bezier(0.55, 0.08, 0.68, 0.53)</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>autoPlay</em>",
          description: `auto plays the carousel on load. pass duration in ms for each item in the carousel`,
          default: "<em>0</em>",
          optional: "Yes",
          type: "Number",
        },
      ]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default carousel;
