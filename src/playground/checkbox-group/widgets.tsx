import React from "react";
import { CheckBoxGroup, Section } from "../../components";
import { DemoWidget } from "../common/demo-widget";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render">
        <DemoWidget>
          <CheckBoxGroup
            onChange={(value) => console.log(value)}
            options={[
              {
                label: "Option 1",
              },
              {
                label: "Option 2",
              },
              {
                label: "Option 3",
              },
              {
                label: "Option 4",
              },
            ]}
          />
        </DemoWidget>
      </Section>
      <Section title="Preselected Option">
        <DemoWidget>
          <CheckBoxGroup
            options={[
              {
                label: "Option 1",
              },
              {
                label: "Option 2",
              },
              {
                label: "Option 3",
                isChecked: true,
              },
            ]}
          />
        </DemoWidget>
      </Section>
      <Section title="Disabled Option">
        <DemoWidget>
          <CheckBoxGroup
            options={[
              {
                label: "Option 1",
              },
              {
                label: "Option 2",
                disabled: true,
              },
              {
                label: "Option 3",
                isChecked: true,
                disabled: true,
              },
            ]}
          />
        </DemoWidget>
      </Section>
      <Section title="Checkbox Group - Circle style">
        <DemoWidget>
          <CheckBoxGroup
            checkboxStyle="round"
            options={[
              {
                label: "Option 1",
              },
              {
                label: "Option 2",
              },
              {
                label: "Option 3",
              },
              {
                label: "Option 4",
              },
            ]}
          />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
