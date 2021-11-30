import React from "react";
import DemoPageRenderer from "./../demo-page-renderer";
import Widgets from "./widgets";

function radio() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[
        {
          name: "<em>id</em>",
          description: "unique id for the radio",
          default: "auto generated",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>label</em>",
          description: "label for the radio",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>value</em>",
          description: "value for the radio",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>isChecked</em>",
          description: "whether the radio is checked",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>disabled</em>",
          description: "whether the radio is disabled",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>focusable</em>",
          description: "whether the radio is focusable",
          default: "true",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>onChange</em>",
          description: "callback for when the radio is changed",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>size</em>",
          description: "size of the radio",
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>style</em>",
          description: "style object for the radio",
          default: "",
          optional: "Yes",
          type: "Object",
        },
      ]}
      tabTitles={["radio", "properties"]}
    ></DemoPageRenderer>
  );
}

export default radio;
