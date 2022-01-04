import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function PageHeader() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[
        {
          name: "title",
          description: `Title of the page.`,
          default: "Page Header",
          optional: "Yes",
          type: "String",
        },
        {
          name: "RTL",
          description: `Right to left support.`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "size",
          description: `Size of the page header. can be "sm" or "md" or "lg".`,
          default: "md",
          optional: "Yes",
          type: "String",
        },
      ]}
      tabTitles={["examples", "properties"]}
      description="Page header can be used to display the title of the page."
      title="Page Header"
    />
  );
}

export default PageHeader;
