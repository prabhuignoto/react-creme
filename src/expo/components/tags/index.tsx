import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function tags() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      title="Tags"
      description="Tags are used to group related content."
      data={[
        {
          name: "<em>tagSize</em>",
          description: `prop to set the size of the tag.<br> <code>'small' | 'large'</code>`,
          default: `<em>small</em>`,
          optional: "Yes",
          type: `String`,
        },
        {
          name: "<em>tagStyle</em>",
          description: `prop to set the style for the tag. <code>'default' | 'fill'</code>`,
          default: `<em>default</em>`,
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
          default: "<em>False</em>",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          name: "<em>readonly</em>",
          description: `prop to set the component to readonly state`,
          default: "<em>False</em>",
          optional: "Yes",
          type: `Boolean`,
        },
        {
          name: "<em>tagWidth</em>",
          description: `maximum width of the tag`,
          default: "<em>50</em>",
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
