import React from "react";
import { Switch } from "../components";
import DemoPageRenderer from "./demo-page-renderer";

function switchComponent() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "label",
          description: `label for the switch`,
          default: `""`,
          optional: "Yes",
        },
        {
          name: "labelOutside",
          description: `places the label outside the switch container`,
          default: `False`,
          optional: "Yes",
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
        },
        {
          name: "focusable",
          description: `enables focus via keyboard`,
          default: "False",
          optional: "Yes",
        },
        {
          name: "width",
          description: `minimum width of the component`,
          default: "50",
          optional: "Yes",
        },
        {
          name: "size",
          description: `prop for setting the size. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "sm",
          optional: "Yes",
        },
        {
          name: "style",
          description: `custom CSS that will be applied to the container of the component`,
          default: `{}`,
          optional: "Yes",
        },
        {
          name: "onChange",
          description: `callback fired on state change`,
          default: ``,
          optional: "Yes",
        },
      ]}
      tabTitles={["Switch", "properties"]}
      demoWidget={
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="rc-demo-widgets"
        >
          <div style={{ width: "150px" }} className="rc-demo-widget">
            <Switch label="Settings" labelOutside checked focusable={false} />
          </div>
          <div style={{ width: "100px" }} className="rc-demo-widget">
            <Switch label="Settings" checked />
          </div>
          <div style={{ width: "200px" }} className="rc-demo-widget">
            <Switch label="Are you authorized" size="md" />
          </div>
          <div style={{ width: "250px" }} className="rc-demo-widget">
            <Switch label="Mookupodi" size="lg" labelOutside />
          </div>
          <div style={{ width: "100px" }} className="rc-demo-widget">
            <Switch label="setting" disabled />
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default switchComponent;
