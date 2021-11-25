import React from "react";
import { Rate } from "../components/rate/rate";
import { SearchIcon } from "../icons";
import DemoPageRenderer from "./demo-page-renderer";

function rate() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "icon",
          description: `custom icon that will be used for rendering`,
          default: `⭐`,
          optional: "Yes",
        },
        {
          name: "iconCount",
          description: `number of times we want to display the icon`,
          default: `5`,
          optional: "Yes",
        },
        {
          name: "focusable",
          description: `makes the component focusable via keyboard`,
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
          name: "ratingValues",
          description: `custom rating values instead of the default numeric`,
          default: "[]",
          optional: "Yes",
        },
        {
          name: "onChange",
          description: `callback fired on state change`,
          default: ``,
          optional: "Yes",
        },
      ]}
      tabTitles={["Rate", "properties"]}
      demoWidget={
        <div className="rc-demo-widgets">
          <div className="rc-demo-widget">
            <Rate
              onChange={(val) => alert(val)}
              ratingValues={["one", "two", "three", "four", "five"]}
            />
          </div>
          <div className="rc-demo-widget">
            <Rate size="md" />
          </div>
          <div className="rc-demo-widget">
            <Rate size="lg" iconCount={3} focusable={false} value={3} />
          </div>
          <div className="rc-demo-widget">
            <Rate size="md" icon={<SearchIcon />} iconCount={7} />
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default rate;
