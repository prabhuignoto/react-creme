import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      title="Inputs"
      description="Inputs are used to collect user input."
      data={[
        {
          name: "controlled",
          description: "Controlled input",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "value",
          description: "Value of the input",
          default: "''",
          optional: "yes",
          type: "string",
        },
        {
          name: "onChange",
          description: "Callback for when the input changes",
          default: "",
          optional: "yes",
          type: "function",
        },
        {
          name: "onKeyUp",
          description: "Callback fired for every keyUp event",
          default: "",
          optional: "yes",
          type: "function",
        },
        {
          name: "placeholder",
          description: "placeholder text",
          default: "",
          optional: "yes",
          type: "string",
        },
        {
          name: "disabled",
          description: "whether the input is disabled",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "type",
          description: "type of the input",
          default: "text",
          optional: "yes",
          type: "string",
        },
        {
          name: "enableClear",
          description: "enables the clear button",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "state",
          description: "state of the input. can be success, error or default",
          default: "default",
          optional: "yes",
          type: "string",
        },
        {
          name: "border",
          description: "enables the border",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "noUniqueId",
          description:
            "disables the unique id generation. when this prop is set to true, the id need to be manually passed",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "id",
          description: "id of the input",
          default: "",
          optional: "yes",
          type: "string",
        },
        {
          name: "isAutoComplete",
          description: "configures the input to be an autocomplete",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default index;
