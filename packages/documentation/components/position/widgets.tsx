import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { PositionLeft, PositionRight, PositionTop } from './position-examples';
import {
  PositionLeftCode,
  PositionRightCode,
  PositionTopCode,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section>
        <DemoWidget codeString={PositionLeftCode}>
          <PositionLeft />
        </DemoWidget>
      </Section>
      <Section>
        <DemoWidget codeString={PositionRightCode}>
          <PositionRight />
        </DemoWidget>
      </Section>
      <Section>
        <DemoWidget codeString={PositionTopCode}>
          <PositionTop />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
