import React from "react";
import { BlockQuote, Button, Section } from "../../components";
import { SearchIcon } from "../../icons";

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <div className="rc-demo-widget">
          <Button label="save" onClick={() => alert("test")} />
        </div>
      </Section>
      <Section title="Icon">
        <BlockQuote>Insert a custom icon to the button.</BlockQuote>
        <div className="rc-demo-widget">
          <Button label="Search this page" size="sm">
            <SearchIcon />
          </Button>
        </div>
      </Section>
      <Section title="Loading state">
        <BlockQuote>
          Use the <code>type</code> property to change the button to a loading
          state.
        </BlockQuote>
        <div className="rc-demo-widget">
          <Button label="Searching ..." size="sm" type="progress"></Button>
        </div>
      </Section>
      <Section title="Disabled">
        <BlockQuote>Buttons can be disabled.</BlockQuote>
        <div className="rc-demo-widget">
          <Button
            border={false}
            label="I am disabled"
            disabled
            onClick={() => alert("test")}
          />
        </div>
      </Section>
      <Section title="Large sized button">
        <BlockQuote>
          Customize the size of the button by using the <code>size</code>
        </BlockQuote>
        <div className="rc-demo-widget">
          <Button label="save as new" type="primary" size="md" border={false} />
        </div>
      </Section>
      <Section title="Button with State (Extra large)">
        <BlockQuote>Buttons can be in different states.</BlockQuote>
        <div className="rc-demo-widget">
          <Button label="save as new" type="danger" size="lg" />
        </div>
      </Section>
    </div>
  );
}

export default widgets;
