import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function transfer() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Transfer"
      description="Transfer is a component that allows you to transfer items between two lists."
      data={[]}
      tabTitles={["examples", "Properties"]}
    ></DemoPageRenderer>
  );
}

export default transfer;
