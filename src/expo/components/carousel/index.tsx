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
          name: "direction",
          description: "prop to set the navigation direction of the carousel",
          default: "horizontal",
          optional: "Yes",
          type: "String",
        },
        {
          name: "height",
          description: "sets the height of the carousel",
          default: "400",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "transition",
          description: "prop to set custom transition animation",
          default: "cubic-bezier(0.55, 0.08, 0.68, 0.53",
          optional: "Yes",
          type: "String",
        },
        {
          name: "autoPlay",
          description: `auto plays the carousel on load. pass duration in ms for each item in the carousel`,
          default: "0",
          optional: "Yes",
          type: "Number",
        },
      ]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default carousel;
