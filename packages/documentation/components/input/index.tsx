import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function index() {
  return (
    <DemoPageRenderer
      title="Inputs"
      description="Inputs are used to collect user input."
      callbacks={[
        {
          name: "onChange",
          description: "Callback fired on input changes",
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
      ]}
      properties={[
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
          name: "placeholder",
          description: "Placeholder text",
          default: "",
          optional: "yes",
          type: "string",
        },
        {
          name: "disabled",
          description: "Disables the Input",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "type",
          description: `Type of input.
          Can be <em>text</em>, <em>password</em>`,
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
          description:
            "State of the input. can be <em>success</em>, <em>error</em> or <em>default</em>",
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
            "Disables the unique id generation. when this prop is set to true, the id need to be manually passed",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "id",
          description: "Input ID",
          default: "",
          optional: "yes",
          type: "string",
        },
        {
          name: "isAutoComplete",
          description: "Configures the input to be an autocomplete.",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "focusable",
          description: "enables focus outlines",
          default: "false",
          optional: "yes",
          type: "boolean",
        },
      ]}
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-dnneps"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default index;
