import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function index() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
      properties={[
        {
          name: "links",
          description: "Array of links to scroll to",
          default: "[]",
          optional: "Yes",
          type: "string[]",
        },
        {
          name: "linksPosition",
          description: "Position of the links",
          default: "left",
          optional: "Yes",
          type: "string",
        },
      ]}
      title="Scroll Spy"
      description={`Scroll Spy is a component that allows you to track the current scroll position of a container
       and display a navigation menu with links to sections of the page or a container.`}
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-tdht4j"]}
    ></DemoPageRenderer>
  );
}

export default index;
