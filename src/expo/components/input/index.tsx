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
          name: "<em>controlled</em>",
          description: "Controlled input",
          default: "<em>false</em>",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "<em>value</em>",
          description: "Value of the input",
          default: "''",
          optional: "yes",
          type: "string",
        },
        {
          name: "<em>onChange</em>",
          description: "Callback for when the input changes",
          default: "",
          optional: "yes",
          type: "function",
        },
        {
          name: "<em>onKeyUp</em>",
          description: "Callback fired for every keyUp event",
          default: "",
          optional: "yes",
          type: "function",
        },
        {
          name: "<em>placeholder</em>",
          description: "placeholder text",
          default: "",
          optional: "yes",
          type: "string",
        },
        {
          name: "<em>disabled</em>",
          description: "whether the input is disabled",
          default: "<em>false</em>",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "<em>type</em>",
          description: "type of the input",
          default: "<em>text</em>",
          optional: "yes",
          type: "string",
        },
        {
          name: "<em>enableClear</em>",
          description: "enables the clear button",
          default: "<em>false</em>",
          optional: "yes",
          type: "boolean",
        },
        {
          name: "<em>state</em>",
          description: "state of the input. can be success, error or default",
          default: "<em>default</em>",
          optional: "yes",
          type: "string",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default index;
