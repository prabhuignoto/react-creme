import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Section"
      description="Section is a container for other components. It can be used to group components together."
      tabTitles={["examples", "properties"]}
      data={[
        {
          name: "title",
          description: "Title of the section",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "height",
          description: "Minimum height of the section",
          default: "150",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "layout",
          description:
            "Layout of the section. can be <em>row</em> or <em>column</em>",
          default: "row",
          optional: "Yes",
          type: "String",
        },
        {
          name: "RTL",
          description: "Right to Left",
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "size",
          description:
            "Size of the page header. can be <em>sm</em> or <em>md</em> or <em>lg</em>.",
          default: "sm",
          optional: "Yes",
          type: "String",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default index;
