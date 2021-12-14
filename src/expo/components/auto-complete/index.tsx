import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      title="Auto Complete"
      description="Auto Complete is a component that provides a dropdown list of suggestions for the user to select from."
      data={[
        {
          name: "suggestionsWidth",
          description: "Width of the suggestions list",
          default: "200",
          optional: "Yes",
          type: "number",
        },
        {
          name: "onChange",
          description: "Callback function when the input value changes",
          default: "",
          optional: "Yes",
          type: "function",
        },
        {
          name: "suggestions",
          description: "Suggestions to be displayed in the list",
          default: "[]",
          optional: "Yes",
          type: "string[]",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default index;
