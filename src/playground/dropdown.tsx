import React from "react";
import { Dropdown } from "../components";
import DemoPageRenderer from "./demo-page-renderer";

function dropdown() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "allowMultiSelection",
          description: `Enables multi selection on the dropdown`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "enableSearch",
          description: `enables search for the dropdown`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "maxMenuHeight",
          description: `sets the maximum height of the dropdown menu`,
          default: "200",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "options",
          description: `array of option passed during initialization`,
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "placeholder",
          description: `placeholder for the dropdown`,
          default: `"Choose an option..."`,
          optional: "Yes",
          type: "String",
        },
        {
          name: "virtualize",
          description: `virtualizes the dropdown menu`,
          default: `False`,
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["dropdown", "properties"]}
      demoWidget={
        <div style={{ width: "450px", margin: "0 auto" }}>
          <div className="rc-demo-widget">
            <Dropdown
              onSelected={(val) => console.log(val)}
              placeholder="choose a country"
              allowMultiSelection
              maxMenuHeight={400}
              virtualize
              options={[
                { name: "germany", value: "germany", disabled: true },
                { name: "india", value: "india" },
                { name: "usa", value: "usa" },
                { name: "uk", value: "uk", selected: true },
                { name: "srilanka", value: "srilanka", selected: false },
                { name: "brazil", value: "brazil", selected: false },
                { name: "france", value: "france", selected: false },
                { name: "japan", value: "japan", selected: true },
                { name: "singapore", value: "singapore", selected: false },
                { name: "brazil", value: "brazil", selected: false },
                { name: "venezuala", value: "venezuala", selected: false },
                {
                  name: "united kingdom",
                  value: "united kingdom",
                  selected: true,
                },
                { name: "australia", value: "australia", selected: false },
              ]}
            />
          </div>
          <div className="rc-demo-widget">
            <Dropdown
              maxMenuHeight={400}
              placeholder="choose another country"
              onSelected={(val) => console.log(val)}
              options={[
                { name: "germany", value: "germany", disabled: true },
                { name: "india", value: "india" },
                { name: "usa", value: "usa", selected: true },
                { name: "uk", value: "uk" },
                { name: "srilanka", value: "srilanka" },
              ]}
            />
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default dropdown;
