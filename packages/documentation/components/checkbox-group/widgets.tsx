import React from "react";
import { CheckBoxGroup, Section } from "../../../lib/components";
import { DemoWidget } from "../../common/demo-widget";

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
                isChecked: true,
                label: "This option is preselected",
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
                disabled: true,
                label: "This option is disabled",
              },
              {
                disabled: true,
                isChecked: true,
                label: "This option is disabled but preselected",
              },
            ]}
          />
        </DemoWidget>
      </Section>
      <Section title="Checkbox Group - Round style">
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
      <Section title="Checkbox Group - RTL">
        <DemoWidget>
          <CheckBoxGroup
            RTL
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
