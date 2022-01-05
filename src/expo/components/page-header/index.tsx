import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function PageHeader() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
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
          description: `Size of the page header.
          </br> can be <em>sm</em> or <em>md</em> or <em>lg</em>.`,
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
