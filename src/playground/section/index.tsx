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
          name: "<em>title</em>",
          description: "Title of the section",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>height</em>",
          description: "Minimum height of the section",
          default: "<em>150</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>layout</em>",
          description: "Layout of the section",
          default: "<em>row</em>",
          optional: "Yes",
          type: "String",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default index;
