import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function sidebar() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "Properties"]}
      demoWidget={<Widgets />}
      title="Sidebar"
      description="Sidebar is a container for sidebar items. It can be used to display a list of items in a collapsible sidebar."
      data={[
        {
          name: "groups",
          description: "Collection of sidebar items passed in groups",
          default: "[]",
          optional: "No",
          type: "Array",
        },
        {
          name: "onSelect",
          description: "Callback that gets invoked on selecting a sidebar item",
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default sidebar;
