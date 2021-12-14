import React from "react";
import { BlockQuote, Button, Section } from "../../../components";
import { SearchIcon } from "../../../icons";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget>
          <Button
            label="save"
            onClick={() => alert("test")}
            focusable={false}
          />
        </DemoWidget>
      </Section>
      <Section title="Icon">
        <BlockQuote>Insert a custom icon to the button.</BlockQuote>
        <DemoWidget>
          <Button label="Search this page" size="sm">
            <SearchIcon />
          </Button>
        </DemoWidget>
      </Section>
      <Section title="Loading state">
        <BlockQuote>
          Use the <code>type</code> property to change the button to a loading
          state.
        </BlockQuote>
        <DemoWidget>
          <Button label="Searching ..." size="sm" type="progress"></Button>
        </DemoWidget>
      </Section>
      <Section title="Disabled">
        <BlockQuote>Buttons can be disabled</BlockQuote>
        <DemoWidget>
          <Button
            border={false}
            label="I am disabled"
            disabled
            onClick={() => alert("test")}
          />
        </DemoWidget>
      </Section>
      <Section title="Large sized button">
        <BlockQuote>
          Customize the size of the button by using the <code>size</code> prop
        </BlockQuote>
        <DemoWidget>
          <Button label="save as new" type="primary" size="md" border={false} />
        </DemoWidget>
      </Section>
      <Section title="Button with State (Extra large)">
        <BlockQuote>
          Buttons can be in different states. Example shows button in{" "}
          <code>danger</code> state
        </BlockQuote>
        <DemoWidget>
          <Button label="save as new" type="danger" size="lg" />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
