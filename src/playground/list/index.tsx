import React from "react";
import DemoPageRenderer from "../common/demo-page-renderer";
import Widgets from "./widgets";

function list() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="List"
      description="List is a component that displays a list of items."
      data={[
        {
          name: "<em>allowMultiSelection</em>",
          description: "Allow multiple selection",
          default: "<em>false</em>",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "<em>borderLess</em>",
          description: "Remove border",
          default: "<em>false</em>",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "<em>itemHeight</em>",
          description: "sets the height of each item",
          default: "<em>45</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>maxHeight</em>",
          description: "sets the max height of the list",
          default: "<em>600</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>minHeight</em>",
          description: "sets the min height of the list",
          default: "<em>100</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>noUniqueIds</em>",
          description: "Disable unique ids",
          default: "<em>false</em>",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "<em>onSelection</em>",
          description: "Callback for selection",
          default: "<em>undefined</em>",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>options</em>",
          description: "List of options",
          default: "<em>[]</em>",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "<em>rowGap</em>",
          description: "sets the gap between rows",
          default: "<em>10</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>showCheckIcon</em>",
          description: "Show check icon",
          default: "<em>true</em>",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "<em>virtualized</em>",
          description: "Enable virtualized list",
          default: "<em>false</em>",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "<em>focusable</em>",
          description: "Enable focusable list",
          default: "<em>false</em>",
          optional: "Yes",
          type: "boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default list;
