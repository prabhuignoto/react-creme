import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import "./data-grid.scss";

const DataGridDemo: React.FunctionComponent = () => {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
      title="Data Grid"
      description="Data Grid is a component that displays data in a table format."
      properties={[
        {
          defaultValue: "comfortable",
          description:
            "Sets the layout style of the grid. can be <em>comfortable</em> or <em>compact</em>",
          name: "layoutStyle",
          optional: "Yes",
          type: "string",
        },
        {
          defaultValue: "[]",
          description: "Columns configuration.",
          name: "columns",
          optional: "Yes",
          type: "Array",
        },
        {
          defaultValue: "[]",
          description: "Row data.",
          name: "data",
          optional: "Yes",
          type: "Array",
        },
        {
          defaultValue: "False",
          description: "Alternates the background color of the grid rows",
          name: "zebra",
          optional: "Yes",
          type: "Boolean",
        },
        {
          defaultValue: "",
          description: "Sets the height of the grid row",
          name: "rowHeight",
          optional: "Yes",
          type: "number",
        },
        {
          defaultValue: "false",
          description: "Makes the height of the grid as fixed",
          name: "fixedHeight",
          optional: "Yes",
          type: "boolean",
        },
      ]}
      tabTitles={["Examples", "Properties", "Type definitions", "Stackblitz"]}
      stackBlitzCodes={["react-ts-vebq81"]}
    ></DemoPageRenderer>
  );
};

export default DataGridDemo;
