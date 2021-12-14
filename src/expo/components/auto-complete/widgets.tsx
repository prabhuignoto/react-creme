import React from "react";
import { AutoComplete, Section } from "../../../components";
import { DemoWidget } from "../../common/demo-widget";

function Widgets() {
  return (
    <Section title="Default Render">
      <DemoWidget>
        <AutoComplete
          suggestions={[
            "Alex",
            "Alec Baldwin",
            "Raghu",
            "Ramesh",
            "Rajesh",
            "Xin Zhao",
            "Zach Galifianakis",
            "mo shang",
            "madhu",
          ]}
        />
      </DemoWidget>
    </Section>
  );
}

export default Widgets;
