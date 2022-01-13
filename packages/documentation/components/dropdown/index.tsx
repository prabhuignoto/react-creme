import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function dropdown() {
  return (
    <DemoPageRenderer
      title="Dropdown"
      description="Dropdown is a component that allows you to select a value from a list of options."
      properties={[
        {
          name: "allowMultiSelection",
          description: `Enables multi selection on the dropdown`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "enableSearch",
          description: `enables search for the dropdown`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "maxMenuHeight",
          description: `sets the maximum height of the dropdown menu`,
          default: "200",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "options",
          description: `array of option passed during initialization`,
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "placeholder",
          description: `placeholder for the dropdown`,
          default: `"Choose an option..."`,
          optional: "Yes",
          type: "String",
        },
        {
          name: "virtualize",
          description: `virtualizes the dropdown menu`,
          default: `False`,
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-b9syfa"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default dropdown;
