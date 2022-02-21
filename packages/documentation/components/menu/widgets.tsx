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
          Menus can be attached to <code>react-creme</code> components or even
          native elements. Simply wrap the Menu control in the target component
          and use the appropriate <code>dockPosition</code> to position the menu
        </BlockQuote>
        <DemoWidget width={100} style={{ marginLeft: '2rem' }}>
          {AttachedToButton}
        </DemoWidget>
      </Section>
      <Section title="Menu attached to a Icon">
        <BlockQuote>
          Menus can be docked to three positions: <code>left</code>,{' '}
          <code>right</code> or <code>center</code>. The example below shows a
          menu docked and aligned to the center of the icon.
        </BlockQuote>
        <DemoWidget width={150} style={{ marginLeft: '2rem' }}>
          {AttachedToIcon}
        </DemoWidget>
      </Section>
      <Section title="Menu attached to a native Element">
        <BlockQuote>
          The example below shows a menu attached to a native element (button).
        </BlockQuote>
        <DemoWidget width={100} style={{ marginLeft: '2rem' }}>
          {AttachedToNativeElement}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
