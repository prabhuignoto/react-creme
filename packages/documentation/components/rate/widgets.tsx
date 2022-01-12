import React from "react";
import { BlockQuote, Rate, Section } from "../../../lib/components";
import { SearchIcon } from "../../../lib/icons";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Rating default">
        <DemoWidget>
          <Rate size="md" />
        </DemoWidget>
      </Section>
      <Section title="Custom icon count">
        <BlockQuote>You can choose the number of icons to display.</BlockQuote>
        <DemoWidget>
          <Rate size="lg" iconCount={3} focusable={false} value={2} />
        </DemoWidget>
      </Section>
      <Section title="Custom Icon">
        <BlockQuote>You can set the custom icon.</BlockQuote>
        <DemoWidget>
          <Rate size="md" icon={<SearchIcon />} iconCount={7} />
        </DemoWidget>
      </Section>
      <Section title="Custom size">
        <BlockQuote>The size of the icon can be customized too</BlockQuote>
        <DemoWidget>
          <Rate
            onChange={(val) => console.log(val)}
            ratingValues={["one", "two", "three", "four", "five"]}
          />
        </DemoWidget>
      </Section>
      <Section title="Disabled state">
        <DemoWidget>
          <Rate size="md" disabled value={3} />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
