import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function tags() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      title="Tags"
      description="Tags are used to group related content."
      callbacks={[
        {
          name: "onChange",
          description: `callback fired on state change`,
          default: ``,
          optional: "Yes",
          type: `Function`,
        },
      ]}
      properties={[
        {
          name: "tagSize",
          description: `prop to set the size of the tag.<br> <em>small</em> | <em>large</em>`,
          default: `small`,
          optional: "Yes",
          type: `String`,
        },
        {
          name: "tagStyle",
          description: `prop to set the style for the tag. <em>default</em> | <em>fill</em>`,
          default: `default`,
          optional: "Yes",
          type: `String`,
        },
        {
          name: "items",
          description: `collection of tag items that will be rendered on load`,
          default: `[]`,
          optional: "Yes",
          type: `Array`,
        },
        {
          name: "maxTags",
          description: `prop to set the maximum number of tags allowed`,
          default: `Number.MAX_VALUE`,
          optional: "Yes",
          type: `Number`,
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          name: "readonly",
          description: `prop to set the component to readonly state`,
          default: "False",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          name: "tagWidth",
          description: `maximum width of the tag`,
          default: "50",
          optional: "Yes",
          type: `Number`,
        },
        {
          name: "style",
          description: `custom CSS that will be applied to the container of the component`,
          default: `{}`,
          optional: "Yes",
          type: `Object`,
        },
      ]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default tags;
