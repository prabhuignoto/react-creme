import React from 'react';
import { BlockQuote, Input, Section } from '../../../lib/components';
import { ChevronRightIcon } from '../../../lib/icons';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget width={200}>
          <Input enableClear></Input>
        </DemoWidget>
      </Section>
      <Section title="Input with a custom Icon">
        <BlockQuote>Use a custom icon inside the input.</BlockQuote>
        <DemoWidget width={200}>
          <Input enableClear focusable>
            <ChevronRightIcon />
          </Input>
        </DemoWidget>
      </Section>
      <Section title="Input with border">
        <BlockQuote>Use a custom icon inside the input.</BlockQuote>
        <DemoWidget width={200}>
          <Input enableClear border>
            <ChevronRightIcon />
          </Input>
        </DemoWidget>
      </Section>
      <Section title="States">
        <BlockQuote>
          Inputs can be configured to have different states. The example below
          shows input in error and success state
        </BlockQuote>
        <DemoWidget width={200}>
          <Input enableClear state="error" focusable></Input>
        </DemoWidget>
        <DemoWidget width={200}>
          <Input enableClear state="success"></Input>
        </DemoWidget>
      </Section>
      <Section title="RTL">
        <DemoWidget width={200}>
          <Input enableClear focusable RTL>
            <ChevronRightIcon />
          </Input>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
