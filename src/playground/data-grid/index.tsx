import React from "react";
import DemoPageRenderer from "../common/demo-page-renderer";
import "./data-grid.scss";
import Widgets from "./widgets";

const DataGridDemo: React.FunctionComponent = () => {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Data Grid"
      description="Data Grid is a component that displays data in a table format."
      data={[
        {
          name: "<em>layoutStyle</em>",
          description: "Layout style of the data grid.",
          defaultValue: "<em>comfortable</em>",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>columns</em>",
          description: "column configuration of the data grid.",
          defaultValue: "<em>[]</em>",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "<em>data</em>",
          description: "data to be displayed in the data grid.",
          defaultValue: "<em>[]</em>",
          optional: "Yes",
          type: "Array",
        },
      ]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
};

export default DataGridDemo;
