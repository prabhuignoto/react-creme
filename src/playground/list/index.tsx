import React from "react";
import DemoPageRenderer from "./../demo-page-renderer";
import Widgets from "./widgets";

function list() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[
        {
          name: "allowMultiSelection",
          description: "Allow multiple selection",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "borderLess",
          description: "Remove border",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "itemHeight",
          description: "sets the height of each item",
          default: "45",
          optional: "Yes",
          type: "number",
        },
        {
          name: "maxHeight",
          description: "sets the max height of the list",
          default: "600",
          optional: "Yes",
          type: "number",
        },
        {
          name: "minHeight",
          description: "sets the min height of the list",
          default: "100",
          optional: "Yes",
          type: "number",
        },
        {
          name: "noUniqueIds",
          description: "Disable unique ids",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "onSelection",
          description: "Callback for selection",
          default: "undefined",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "options",
          description: "List of options",
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "rowGap",
          description: "sets the gap between rows",
          default: "10",
          optional: "Yes",
          type: "number",
        },
        {
          name: "showCheckIcon",
          description: "Show check icon",
          default: "true",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "virtualized",
          description: "Enable virtualized list",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "focusable",
          description: "Enable focusable list",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
      ]}
      tabTitles={["list", "properties"]}
    ></DemoPageRenderer>
  );
}

export default list;
