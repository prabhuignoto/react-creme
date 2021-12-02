import React from "react";
import { Section } from "../../components";
import { Rate } from "../../components/rate/rate";
import { SearchIcon } from "../../icons";

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Rating default">
        <div className="rc-demo-widget">
          <Rate size="md" />
        </div>
      </Section>
      <Section title="Custom icon count">
        <div className="rc-demo-widget">
          <Rate size="lg" iconCount={3} focusable={false} value={3} />
        </div>
      </Section>
      <Section title="Custom Icon">
        <div className="rc-demo-widget">
          <Rate size="md" icon={<SearchIcon />} iconCount={7} />
        </div>
      </Section>
      <Section title="Custom size">
        <div className="rc-demo-widget">
          <Rate
            onChange={(val) => alert(val)}
            ratingValues={["one", "two", "three", "four", "five"]}
          />
        </div>
      </Section>
    </div>
  );
}

export default widgets;
