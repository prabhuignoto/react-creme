import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      tabTitles={["section", "properties"]}
      data={[]}
    ></DemoPageRenderer>
  );
}

export default index;
