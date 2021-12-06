import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function dropdown() {
  return (
    <DemoPageRenderer
      title="Dropdown"
      description="Dropdown is a component that allows you to select a value from a list of options."
      data={[
        {
          name: "<em>allowMultiSelection</em>",
          description: `Enables multi selection on the dropdown`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>disabled</em>",
          description: `disables the button`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>enableSearch</em>",
          description: `enables search for the dropdown`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>maxMenuHeight</em>",
          description: `sets the maximum height of the dropdown menu`,
          default: "<em>200</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>options</em>",
          description: `array of option passed during initialization`,
          default: "<em>[]</em>",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "<em>placeholder</em>",
          description: `placeholder for the dropdown`,
          default: `<em>"Choose an option..."</em>`,
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>virtualize</em>",
          description: `virtualizes the dropdown menu`,
          default: `<em>False</em>`,
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default dropdown;
