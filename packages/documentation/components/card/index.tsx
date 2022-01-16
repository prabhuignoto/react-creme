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
          default: "",
          description: "Renders the passed element inside the header section",
          name: "header",
          optional: "Yes",
          type: "React.ReactNode",
        },
        {
          default: "",
          description: "Renders the passed element inside the footer section",
          name: "footer",
          optional: "Yes",
          type: "React.ReactNode",
        },
        {
          default: "200",
          description: "Minimum height of the card",
          name: "minHeight",
          optional: "Yes",
          type: "number",
        },
        {
          default: "left",
          description: `aligns the header element to <em>left</em> | <em>right</em> | <em>center</em>`,
          name: "alignHeader",
          optional: "Yes",
          type: "string",
        },
        {
          default: "left",
          description: `aligns the footer element to <em>left</em> | <em>right</em> | <em>center</em>`,
          name: "alignHeader",
          optional: "Yes",
          type: "string",
        },
        {
          default: "False",
          description: "Enables the shadow for the card",
          name: "shadow",
          optional: "Yes",
          type: "boolean",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default card;
