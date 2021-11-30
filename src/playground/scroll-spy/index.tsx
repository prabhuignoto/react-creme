import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[]}
      tabTitles={["scroll spy", "properties"]}
    ></DemoPageRenderer>
  );
}

export default index;
