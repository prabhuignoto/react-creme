import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function rate() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "icon",
          description: `custom icon that will be used for rendering`,
          default: `⭐`,
          optional: "Yes",
          type: `String`,
        },
        {
          name: "iconCount",
          description: `number of times we want to display the icon`,
          default: `5`,
          optional: "Yes",
          type: `Number`,
        },
        {
          name: "focusable",
          description: `makes the component focusable via keyboard`,
          default: "False",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          name: "size",
          description: `sets the size of the button. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "sm",
          optional: "Yes",
          type: `String`,
        },
        {
          name: "ratingValues",
          description: `custom rating values instead of the default numeric`,
          default: "[]",
          optional: "Yes",
          type: `Array`,
        },
        {
          name: "onChange",
          description: `callback fired on state change`,
          default: ``,
          optional: "Yes",
          type: `Function`,
        },
      ]}
      tabTitles={["Rate", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default rate;
