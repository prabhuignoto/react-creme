import React from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  AttachedToButton,
  AttachedToIcon,
  AttachedToNativeElement,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Menu attached to a Button">
        <BlockQuote>
          The example below shows a menu attached to a button.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: '100px' }}>
            <AttachedToButton />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Menu attached to a Icon">
        <BlockQuote>
          Menus can be docked and aligned to three supported positions: left,
          right, and center. The example below shows a menu docked and aligned
          to the center of the icon.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: '100px' }}>
            <AttachedToIcon />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Menu attached to a native Element">
        <BlockQuote>
          The example below shows a menu attached to a native element (button).
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: '100px' }}>
            <AttachedToNativeElement />
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
