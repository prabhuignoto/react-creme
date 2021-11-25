import React, { CSSProperties } from "react";
import { Button } from "../components";
import { SearchIcon } from "../icons";
import DemoPageRenderer from "./demo-page-renderer";

const style: CSSProperties = {
  width: "100px",
  margin: "2rem 0",
};

function buttons() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "label",
          description: `text to be displayed in the button`,
          default: `""`,
          optional: "Yes",
        },
        {
          name: "type",
          description: `configures the type of button. <br> <code>"primary" | "default" | "danger" | "icon" | "progress"</code>`,
          default: "default",
          optional: "Yes",
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
        },
        {
          name: "size",
          description: `sets the size of the button. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "sm",
          optional: "Yes",
        },
        {
          name: "style",
          description: `any custom CSS`,
          default: "{}",
          optional: "Yes",
        },
        {
          name: "focusable",
          description: `makes the component focusable via keyboard`,
          default: "False",
          optional: "Yes",
        },
        {
          name: "border",
          description: `prop for disabling the button border`,
          default: "true",
          optional: "Yes",
        },
      ]}
      tabTitles={["buttons", "properties"]}
      demoWidget={
        <div className="rc-demo-widgets">
          <div style={style} className="rc-demo-widget">
            <Button
              border={false}
              label="I am disabled"
              disabled
              onClick={() => alert("test")}
            />
          </div>
          <div style={style} className="rc-demo-widget">
            <Button
              label="save as new"
              type="primary"
              size="md"
              border={false}
            />
          </div>
          <div style={style} className="rc-demo-widget">
            <Button label="save as new" type="danger" size="lg" />
          </div>
          <div style={style} className="rc-demo-widget">
            <Button label="save" onClick={() => alert("test")} />
          </div>
          <div style={style} className="rc-demo-widget">
            <Button label="Search this page" size="sm">
              <SearchIcon />
            </Button>
          </div>
          <div style={style} className="rc-demo-widget">
            <Button label="Searching ..." size="sm" type="progress"></Button>
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default buttons;
