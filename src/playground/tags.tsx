import React from "react";
import { Tags } from "../components";
import DemoPageRenderer from "./demo-page-renderer";

function tags() {
  return (
    <DemoPageRenderer
      tabTitles={["tags", "properties"]}
      data={[
        {
          name: "tagSize",
          description: `prop to set the size of the tag.<br> <code>'small' | 'large'</code>`,
          default: `small`,
          optional: "Yes",
        },
        {
          name: "tagStyle",
          description: `prop to set the style for the tag. <code>'default' | 'fill'</code>`,
          default: `default`,
          optional: "Yes",
        },
        {
          name: "items",
          description: `collection of tag items that will be rendered on load`,
          default: `[]`,
          optional: "Yes",
        },
        {
          name: "maxTags",
          description: `prop to set the maximum number of tags allowed`,
          default: `Number.MAX_VALUE`,
          optional: "Yes",
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
        },
        {
          name: "readonly",
          description: `prop to set the component to readonly state`,
          default: "False",
          optional: "Yes",
        },
        {
          name: "tagWidth",
          description: `maximum width of the tag`,
          default: "50",
          optional: "Yes",
        },
        {
          name: "style",
          description: `custom CSS that will be applied to the container of the component`,
          default: `{}`,
          optional: "Yes",
        },
        {
          name: "onSelected",
          description: `callback fired on state change`,
          default: ``,
          optional: "Yes",
        },
      ]}
      demoWidget={
        <div style={{ width: "500px", margin: "0 auto" }}>
          <div style={{ width: "500px" }}>
            <Tags
              items={[
                { name: "prabhu", disabled: false },
                { name: "blue" },
                { name: "red" },
                { name: "orange" },
                { name: "tester", disabled: false },
              ]}
              maxTags={15}
              restrictToValues={["one", "two"]}
              onSelected={(val) => console.log(val)}
              readonly
              tagWidth={50}
            />
          </div>
          <br></br>
          <br></br>
          <div style={{ width: "500px" }}>
            <Tags
              items={[
                { name: "prabhu murthy", disabled: false },
                { name: "blue" },
                { name: "red" },
                { name: "orange" },
                { name: "tester", disabled: false },
              ]}
              maxTags={15}
              onSelected={(val) => console.log(val)}
              tagWidth={150}
            />
          </div>
          <br></br>
          <br></br>
          <div style={{ width: "500px" }}>
            <Tags
              items={[
                { name: "prabhu murthy", disabled: false },
                { name: "blue" },
                { name: "red" },
                { name: "orange" },
                { name: "tester", disabled: true },
              ]}
              maxTags={15}
              onSelected={(val) => console.log(val)}
              tagWidth={150}
              tagStyle="fill"
            />
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default tags;
