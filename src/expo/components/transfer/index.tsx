import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function transfer() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Transfer"
      description="Transfer is a component that allows you to transfer items between two lists."
      data={[
        {
          name: "list1",
          description: "Source array for list one",
          default: "[]",
          optional: "Yes",
          type: "array",
        },
        {
          name: "list2",
          description: "Source array for list two",
          default: "[]",
          optional: "Yes",
          type: "array",
        },
        {
          name: "onChange",
          description: "Callback function fired when items are transferred",
          default: "",
          optional: "Yes",
          type: "function",
        },
        {
          name: "virtualize",
          description: "Enable virtualization of the lists",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "enableSearch",
          description: "Enable search functionality",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
      ]}
      tabTitles={["examples", "Properties"]}
    ></DemoPageRenderer>
  );
}

export default transfer;
