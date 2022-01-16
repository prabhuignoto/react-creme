import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function rate() {
  return (
    <DemoPageRenderer
      title="Rate"
      description="Rate is a component that allows users to rate something."
      callbacks={[
        {
          default: ``,
          description: `callback function that will be called when the rating changes`,
          name: "onChange",
          optional: "Yes",
          type: `Function`,
        },
      ]}
      properties={[
        {
          default: `⭐`,
          description: `custom icon that will be used for rendering`,
          name: "icon",
          optional: "Yes",
          type: `String`,
        },
        {
          default: `5`,
          description: `number of icons to render`,
          name: "iconCount",
          optional: "Yes",
          type: `Number`,
        },
        {
          default: "False",
          description: `makes the component focusable via keyboard`,
          name: "focusable",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          default: "sm",
          description: `sets the size of the button.
          <br> <em>sm</em> | <em>md</em> | <em>lg</em>`,
          name: "size",
          optional: "Yes",
          type: `String`,
        },
        {
          default: "[]",
          description: `sets the custom rating values. <br> <em>["1", "2", "3", "4", "5"]</em>`,
          name: "ratingValues",
          optional: "Yes",
          type: `Array`,
        },
      ]}
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-lqtbt6"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default rate;
