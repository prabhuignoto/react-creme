import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[]}
      title="Scroll Spy"
      description={`Scroll Spy is a component that allows you to track the current scroll position of a container
       and display a navigation menu with links to sections of the page or a container.`}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default index;
