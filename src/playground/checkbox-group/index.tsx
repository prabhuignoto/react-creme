import React from "react";
import DemoPageRenderer from "./../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      title="Checkbox Group"
      description="Checkbox group is a group of checkboxes that can be used to select multiple options."
      demoWidget={<Widgets />}
      data={[]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default index;
