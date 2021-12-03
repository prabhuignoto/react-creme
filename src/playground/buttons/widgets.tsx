import React from "react";
import { Button, Section } from "../../components";
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
        <div className="rc-demo-widget">
          <Button label="Search this page" size="sm">
            <SearchIcon />
          </Button>
        </div>
      </Section>
      <Section title="Loading state">
        <div className="rc-demo-widget">
          <Button label="Searching ..." size="sm" type="progress"></Button>
        </div>
      </Section>
      <Section title="Disabled">
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
        <div className="rc-demo-widget">
          <Button label="save as new" type="primary" size="md" border={false} />
        </div>
      </Section>
      <Section title="Button with State (Extra large)">
        <div className="rc-demo-widget">
          <Button label="save as new" type="danger" size="lg" />
        </div>
      </Section>
    </div>
  );
}

export default widgets;
