import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function transfer() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
      title="Transfer"
      description="Transfer is a component that allows you to transfer items between two lists."
      callbacks={[
        {
          name: "onChange",
          description: "Callback function fired when items are transferred",
          default: "",
          optional: "Yes",
          type: "function",
        },
      ]}
      properties={[
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
      tabTitles={["examples", "Properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-q3izbn"]}
    ></DemoPageRenderer>
  );
}

export default transfer;
