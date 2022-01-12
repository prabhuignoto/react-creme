import React from "react";
import { BlockQuote, PageHeader, Section } from "../../../lib/components";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section>
        <BlockQuote>
          Page header can be used to display the title of the page.
        </BlockQuote>
        <DemoWidget fullWidth>
          <PageHeader title="Page Header" />
        </DemoWidget>
      </Section>
      <Section>
        <DemoWidget fullWidth>
          <PageHeader title="Page Header (Right to Left)" RTL />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
