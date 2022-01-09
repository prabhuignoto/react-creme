import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function sidebar() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "Properties"]}
      demoWidget={lazy(() => import("./widgets"))}
      title="Sidebar"
      description="Sidebar is a container for sidebar items. It can be used to display a list of items in a collapsible sidebar."
      callbacks={[
        {
          name: "onSelect",
          description: "Callback that gets invoked on selecting a sidebar item",
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      properties={[
        {
          name: "groups",
          description: "Collection of sidebar items passed in groups",
          default: "[]",
          optional: "No",
          type: "Array",
        },
        {
          name: "groupIconColor",
          description: "Color of the group icon",
          default: "#000",
          optional: "Yes",
          type: "String",
        },
        {
          name: "groupTitleColor",
          description: "Color of the group title",
          default: "#000",
          optional: "Yes",
          type: "String",
        },
        {
          name: "backGroundColor",
          description: "Background color",
          default: "#fff",
          optional: "Yes",
          type: "String",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default sidebar;
