import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function switchComponent() {
  return (
    <DemoPageRenderer
      title="Switch"
      description={`Toggle switch (known as “toggles”) is a UI control that has two mutually-exclusive states, such as ON and OFF.
      The design and functionality of this control is based on a physical switch that allows users to turn things ON or OFF`}
      callbacks={[
        {
          default: ``,
          description: `callback fired on state change`,
          name: "onChange",
          optional: "Yes",
          type: "Function",
        },
      ]}
      properties={[
        {
          default: `""`,
          description: `label for the switch`,
          name: "label",
          optional: "Yes",
          typ: "String",
        },
        {
          default: `False`,
          description: `places the label outside the switch container`,
          name: "labelOutside",
          optional: "Yes",
          type: "Boolean",
        },
        {
          default: "False",
          description: `disables the button`,
          name: "disabled",
          optional: "Yes",
          type: "Boolean",
        },
        {
          default: "False",
          description: `enables focus via keyboard`,
          name: "focusable",
          optional: "Yes",
          type: "Boolean",
        },
        {
          default: "50",
          description: `minimum width of the component`,
          name: "width",
          optional: "Yes",
          type: "Number",
        },
        {
          default: "sm",
          description: `prop for setting the size. <br> <em>sm</em> | <em>md</em> | <em>lg</em>`,
          name: "size",
          optional: "Yes",
          type: "String",
        },
        {
          default: `{}`,
          description: `custom CSS that will be applied to the container of the component`,
          name: "style",
          optional: "Yes",
          type: "Object",
        },
      ]}
      tabTitles={["Examples", "Properties", "Type definitions", "Stackblitz"]}
      stackBlitzCodes={["react-ts-p8rf9h"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default switchComponent;
