import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import "./data-grid.scss";
import Widgets from "./widgets";

const DataGridDemo: React.FunctionComponent = () => {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[]}
      tabTitles={["Data Grid", "properties"]}
    ></DemoPageRenderer>
  );
};

export default DataGridDemo;
