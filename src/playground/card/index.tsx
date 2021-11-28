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
          name: "header",
          description: "Renders the passed element inside the header section",
          default: "",
          optional: "Yes",
          type: "React.ReactNode",
        },
        {
          name: "footer",
          description: "Renders the passed element inside the footer section",
          default: "",
          optional: "Yes",
          type: "React.ReactNode",
        },
        {
          name: "minHeight",
          description: "Minimum height of the card",
          default: "200",
          optional: "Yes",
          type: "number",
        },
        {
          name: "maxHeight",
          description: "Maximum height of the card",
          default: "400",
          optional: "Yes",
          type: "number",
        },
        {
          name: "alignHeader",
          description:
            "aligns the header element to 'left' | 'right' | 'center",
          default: "left",
          optional: "Yes",
          type: "string",
        },
        {
          name: "alignHeader",
          description:
            "aligns the footer element to 'left' | 'right' | 'center",
          default: "left",
          optional: "Yes",
          type: "string",
        },
        {
          name: "shadow",
          description: "Enables the shadow for the card",
          default: "False",
          optional: "Yes",
          type: "boolean",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default card;
