import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function rate() {
  return (
    <DemoPageRenderer
      title="Rate"
      description="Rate is a component that allows users to rate something."
      callbacks={[
        {
          name: "onChange",
          description: `callback function that will be called when the rating changes`,
          default: ``,
          optional: "Yes",
          type: `Function`,
        },
      ]}
      properties={[
        {
          name: "icon",
          description: `custom icon that will be used for rendering`,
          default: `⭐`,
          optional: "Yes",
          type: `String`,
        },
        {
          name: "iconCount",
          description: `number of icons to render`,
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
          description: `sets the size of the button.
          <br> <em>sm</em> | <em>md</em> | <em>lg</em>`,
          default: "sm",
          optional: "Yes",
          type: `String`,
        },
        {
          name: "ratingValues",
          description: `sets the custom rating values. <br> <em>["1", "2", "3", "4", "5"]</em>`,
          default: "[]",
          optional: "Yes",
          type: `Array`,
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default rate;