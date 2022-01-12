import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function card() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties", "Stackblitz"]}
      demoWidget={lazy(() => import("./widgets"))}
      title="Card"
      stackBlitzCodes={["react-ts-3qkmbh"]}
      description="Card is a container for displaying content."
      properties={[
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
          name: "alignHeader",
          description: `aligns the header element to <em>left</em> | <em>right</em> | <em>center</em>`,
          default: "left",
          optional: "Yes",
          type: "string",
        },
        {
          name: "alignHeader",
          description: `aligns the footer element to <em>left</em> | <em>right</em> | <em>center</em>`,
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
