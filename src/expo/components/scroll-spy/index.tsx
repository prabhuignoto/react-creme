import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[
        {
          name: "links",
          description: "Array of links to scroll to",
          type: "Array<string>",
          optional: "Yes",
          default: "",
        },
        {
          name: "linksPosition",
          description: "Position of the links",
          type: "string",
          optional: "Yes",
          default: "left",
        },
      ]}
      title="Scroll Spy"
      description={`Scroll Spy is a component that allows you to track the current scroll position of a container
       and display a navigation menu with links to sections of the page or a container.`}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default index;