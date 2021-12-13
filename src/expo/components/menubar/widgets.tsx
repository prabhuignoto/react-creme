import React from "react";
import { MenuBar, Section } from "../../../components";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render">
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
                menu: [{ name: "open" }, { name: "close" }, { name: "clone" }],
              },
            ]}
          ></MenuBar>
        </div>
      </Section>
    </div>
  );
}

export default Widgets;
