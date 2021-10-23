import React from "react";
import { MenuBar } from "../components";

function menubar() {
  return (
    <div>
      <MenuBar
        onSelected={(val) => console.log(val)}
        width={500}
        align="left"
        items={[
          {
            name: "File",
            menu: [{ name: "prabhuy" }, { name: "tester" }],
          },
          {
            name: "Edit",
            menu: [
              { name: "tester1" },
              { name: "prabhu", disabled: true },
              { name: "tester" },
              { name: "tester2" },
            ],
          },
          {
            name: "Selection",
            menu: [{ name: "mars" }, { name: "moon" }],
          },
          {
            name: "View",
            menu: [
              { name: "olympus" },
              { name: "prabhu" },
              { name: "tester" },
              { name: "rivera" },
            ],
          },
          {
            name: "Go",
            menu: [{ name: "olympus" }, { name: "rivera" }],
          },
          {
            name: "Run",
            menu: [{ name: "olympus" }, { name: "rivera" }],
          },
          {
            name: "Terminal",
            menu: [
              { name: "olympus" },
              { name: "rivera" },
              { name: "olympus" },
              { name: "rivera" },
            ],
          },
        ]}
      ></MenuBar>
    </div>
  );
}

export default menubar;
