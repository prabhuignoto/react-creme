import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function slider() {
  return (
    <DemoPageRenderer
      callbacks={[
        {
          name: "onChange",
          description: "The function to call when the slider value changes.",
          default: "",
          optional: "Yes",
          type: "function",
        },
      ]}
      properties={[
        {
          name: "start",
          description: "The starting value of the slider.",
          default: "1",
          optional: "Yes",
          type: "number",
        },
        {
          name: "end",
          description: "The ending value of the slider.",
          default: "10",
          optional: "Yes",
          type: "number",
        },
        {
          name: "sliderValue",
          description: "The current value of the slider.",
          default: "0",
          optional: "Yes",
          type: "number",
        },
        {
          name: "position",
          description: "The position of the tooltip.",
          default: "top",
          optional: "Yes",
          type: "string",
        },
        {
          name: "disableTooltip",
          description: "Disables the tooltip.",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "showTooltipOnHover",
          description: "Shows the tooltip only on hover.",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "showCheckIcon",
          description: "Shows the check icon.",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "tooltipWidth",
          description: "The width of the tooltip.",
          default: "<code>40</code>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "knobSize",
          description: "The size of the knob.",
          default: "16px",
          optional: "Yes",
          type: "number",
        },
        {
          name: "knobShape",
          description:
            "The shape of the knob. can be <code>circle</code> or <code>square</code>",
          default: "circle",
          optional: "Yes",
          type: "string",
        },
        {
          name: "disabled",
          description: "Disables the slider.",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./widgets"))}
      title="Slider"
      description="Slider is a component that allows you to select a value from a range of values."
    ></DemoPageRenderer>
  );
}

export default slider;