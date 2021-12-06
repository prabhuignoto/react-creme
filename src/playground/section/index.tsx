import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
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
          description: "Layout of the section",
          default: "row",
          optional: "Yes",
          type: "String",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default index;
