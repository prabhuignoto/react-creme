import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function index() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
      title="Section"
      description="Section is a container for other components. It can be used to group components together."
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-2fdwsf"]}
      properties={[
        {
          default: "",
          description: "Title of the section",
          name: "title",
          optional: "Yes",
          type: "String",
        },
        {
          default: "150",
          description: "Minimum height of the section",
          name: "height",
          optional: "Yes",
          type: "Number",
        },
        {
          default: "row",
          description:
            "Layout of the section. can be <em>row</em> or <em>column</em>",
          name: "layout",
          optional: "Yes",
          type: "String",
        },
        {
          default: "False",
          description: "Right to Left",
          name: "RTL",
          optional: "Yes",
          type: "Boolean",
        },
        {
          default: "sm",
          description:
            "Size of the page header. can be <em>sm</em> or <em>md</em> or <em>lg</em>.",
          name: "size",
          optional: "Yes",
          type: "String",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default index;
