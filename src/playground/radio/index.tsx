import React from "react";
import DemoPageRenderer from "./../demo-page-renderer";
import Widgets from "./widgets";

function radio() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[
        {
          name: "id",
          description: "unique id for the radio",
          default: "auto generated",
          optional: "Yes",
          type: "String",
        },
        {
          name: "label",
          description: "label for the radio",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "value",
          description: "value for the radio",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "isChecked",
          description: "whether the radio is checked",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "disabled",
          description: "whether the radio is disabled",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "focusable",
          description: "whether the radio is focusable",
          default: "true",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "onChange",
          description: "callback for when the radio is changed",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "size",
          description: "size of the radio",
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "style",
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
