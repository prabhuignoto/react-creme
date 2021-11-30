import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function card() {
  return (
    <DemoPageRenderer
      tabTitles={["card", "properties"]}
      demoWidget={<Widgets />}
      data={[
        {
          name: "<em>header</em>",
          description: "Renders the passed element inside the header section",
          default: "",
          optional: "Yes",
          type: "React.ReactNode",
        },
        {
          name: "<em>footer</em>",
          description: "Renders the passed element inside the footer section",
          default: "",
          optional: "Yes",
          type: "React.ReactNode",
        },
        {
          name: "<em>minHeight</em>",
          description: "Minimum height of the card",
          default: "<em>200</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>maxHeight</em>",
          description: "Maximum height of the card",
          default: "<em>400</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>alignHeader</em>",
          description:
            "aligns the header element to 'left' | 'right' | 'center",
          default: "<em>left</em>",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>alignHeader</em>",
          description:
            "aligns the footer element to 'left' | 'right' | 'center",
          default: "<em>left</em>",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>shadow</em>",
          description: "Enables the shadow for the card",
          default: "<em>False</em>",
          optional: "Yes",
          type: "boolean",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default card;
