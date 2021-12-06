import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import "./data-grid.scss";
import Widgets from "./widgets";

const DataGridDemo: React.FunctionComponent = () => {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Data Grid"
      description="Data Grid is a component that displays data in a table format."
      data={[]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
};

export default DataGridDemo;
