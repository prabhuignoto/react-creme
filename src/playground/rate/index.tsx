import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function rate() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "<em>icon</em>",
          description: `custom icon that will be used for rendering`,
          default: `<em>⭐</em>`,
          optional: "Yes",
          type: `String`,
        },
        {
          name: "<em>iconCount</em>",
          description: `number of icons to render`,
          default: `<em>5</em>`,
          optional: "Yes",
          type: `Number`,
        },
        {
          name: "<em>focusable</em>",
          description: `makes the component focusable via keyboard`,
          default: "<em>False</em>",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          name: "<em>size</em>",
          description: `sets the size of the button. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "<em>sm</em>",
          optional: "Yes",
          type: `String`,
        },
        {
          name: "<em>ratingValues</em>",
          description: `sets the custom rating values. <br> <code>["1", "2", "3", "4", "5"]</code>`,
          default: "<em>[]</em>",
          optional: "Yes",
          type: `Array`,
        },
        {
          name: "<em>onChange</em>",
          description: `callback function that will be called when the rating changes`,
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
