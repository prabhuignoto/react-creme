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
          name: "layoutStyle",
          description: "Layout style of the data grid.",
          defaultValue: "comfortable",
          optional: "Yes",
          type: "string",
        },
        {
          name: "columns",
          description: "column configuration of the data grid.",
          defaultValue: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "data",
          description: "data to be displayed in the data grid.",
          defaultValue: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "zebra",
          description: "alternates the background color of the rows",
          defaultValue: "False",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-vebq81"]}
    ></DemoPageRenderer>
  );
};

export default DataGridDemo;
