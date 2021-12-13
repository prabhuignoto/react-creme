import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function checkbox() {
  return (
    <DemoPageRenderer
      title="Checkbox"
      description={`Checkboxes are used when there is a list of options and the user may select any number of choices, including zero.
      Each checkbox is independent of all other checkboxes in the list, and checking one box doesn’t uncheck the others.`}
      data={[
        {
          name: "<em>label</em>",
          description: `label for the checkbox`,
          default: `<em>""</em>`,
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>disabled</em>",
          description: `disables the button`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>size</em>",
          description: `sets the size of the button. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "<em>sm</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>style</em>",
          description: `any custom CSS`,
          default: "<em>{}</em>",
          optional: "Yes",
          type: "Object",
        },
        {
          name: "<em>focusable</em>",
          description: `makes the component focusable via keyboard`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>border</em>",
          description: `prop for disabling the button border`,
          default: "<em>true</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>isChecked</em>",
          description: `prop to set the checkbox to checked state on load`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>onChange</em>",
          description: `Callback fired when the state changes`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default checkbox;
