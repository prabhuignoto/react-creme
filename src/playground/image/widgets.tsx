import React from "react";
import { BlockQuote, Section } from "../../components";
import { Image } from "../../components/image/image";
import { DemoWidget } from "../common/demo-widget";

function widgets() {
  return (
    <div className={"rc-demo-widgets"}>
      <Section title="Default render">
        <DemoWidget>
          <Image
            width={200}
            height={200}
            expandImageOnClick
            src="https://images.unsplash.com/photo-1637196268676-ccfe49d8ba1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          />
        </DemoWidget>
      </Section>
      <Section title="Expandable Image">
        <BlockQuote>
          use <code>expandImageOnClick</code> to make image expandable on click.
        </BlockQuote>
        <DemoWidget>
          <Image
            width={300}
            height={200}
            expandImageOnClick
            src="https://images.unsplash.com/photo-1639074430062-2a2c8d3b1f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
          />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
