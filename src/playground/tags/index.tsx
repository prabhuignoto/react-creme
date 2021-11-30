import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function tags() {
  return (
    <DemoPageRenderer
      tabTitles={["tags", "properties"]}
      data={[
        {
          name: "<em>tagSize</em>",
          description: `prop to set the size of the tag.<br> <code>'small' | 'large'</code>`,
          default: `small`,
          optional: "Yes",
          type: `String`,
        },
        {
          name: "<em>tagStyle</em>",
          description: `prop to set the style for the tag. <code>'default' | 'fill'</code>`,
          default: `default`,
          optional: "Yes",
          type: `String`,
        },
        {
          name: "<em>items</em>",
          description: `collection of tag items that will be rendered on load`,
          default: `[]`,
          optional: "Yes",
          type: `Array`,
        },
        {
          name: "<em>maxTags</em>",
          description: `prop to set the maximum number of tags allowed`,
          default: `Number.MAX_VALUE`,
          optional: "Yes",
          type: `Number`,
        },
        {
          name: "<em>disabled</em>",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          name: "<em>readonly</em>",
          description: `prop to set the component to readonly state`,
          default: "False",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          name: "<em>tagWidth</em>",
          description: `maximum width of the tag`,
          default: "50",
          optional: "Yes",
          type: `Number`,
        },
        {
          name: "<em>style</em>",
          description: `custom CSS that will be applied to the container of the component`,
          default: `{}`,
          optional: "Yes",
          type: `Object`,
        },
        {
          name: "<em>onSelected</em>",
          description: `callback fired on state change`,
          default: ``,
          optional: "Yes",
          type: `Function`,
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tags;
