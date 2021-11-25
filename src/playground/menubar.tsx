import React from "react";
import { MenuBar } from "../components";
import DemoPageRenderer from "./demo-page-renderer";

function menubar() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "align",
          description: `aligns the menubar items to 'left' or 'right`,
          default: "left",
          optional: "Yes",
        },
        {
          name: "items",
          description: `Collection of Menu Items`,
          default: "[]",
          optional: "Yes",
        },
        {
          name: "width",
          description: `minimum width of the menu bar`,
          default: "300",
          optional: "Yes",
        },
        {
          name: "onSelected",
          description: `callback fired when a menu item is selected`,
          default: "",
          optional: "Yes",
        },
      ]}
      tabTitles={["menu bar", "properties"]}
      demoWidget={
        <div className="rc-demo-widgets">
          <div className="rc-demo-widget">
            <MenuBar
              onSelected={(val) => console.log(val)}
              width={500}
              align="left"
              items={[
                {
                  name: "File",
                  menu: [{ name: "Open" }, { name: "close" }],
                },
                {
                  name: "Edit",
                  menu: [
                    { name: "cut" },
                    { name: "copy", disabled: true },
                    { name: "paste" },
                    { name: "select" },
                  ],
                },
                {
                  name: "Selection",
                  menu: [{ name: "mars" }, { name: "moon" }],
                },
                {
                  name: "View",
                  menu: [{ name: "Zoom" }, { name: "full screen" }],
                },
                {
                  name: "Run",
                  menu: [{ name: "olympus" }, { name: "rivera" }],
                },
                {
                  name: "Terminal",
                  menu: [
                    { name: "open" },
                    { name: "close" },
                    { name: "clone" },
                  ],
                },
              ]}
            ></MenuBar>
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default menubar;
