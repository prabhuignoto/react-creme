import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function checkbox() {
  return (
    <DemoPageRenderer
      title="Checkbox"
      description={`Checkboxes are used when there is a list of options and the user may select any number of choices, including zero.
      Each checkbox is independent of all other checkboxes in the list, and checking one box doesn’t uncheck the others.`}
      callbacks={[
        {
          name: "onChange",
          description: `Callback fired when the state changes`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      properties={[
        {
          name: "label",
          description: `label for the checkbox`,
          default: `""`,
          optional: "Yes",
          type: "String",
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "size",
          description: `sets the size of the button. <br> <em>sm</em> | <em>md</em> | <em>lg</em>`,
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "style",
          description: `any custom CSS`,
          default: "{}",
          optional: "Yes",
          type: "Object",
        },
        {
          name: "focusable",
          description: `makes the component focusable via keyboard`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "border",
          description: `prop for disabling the button border`,
          default: "true",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "isChecked",
          description: `prop to set the checkbox to checked state on load`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default checkbox;
