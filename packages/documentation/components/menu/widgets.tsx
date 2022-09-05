import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  AttachedToButton,
  AttachedToIcon,
  AttachedToNativeElement,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Menu attached to a Button">
        <Text>
          Menus can be attached to <code>react-creme</code> components or even
          native elements. Simply wrap the Menu control in the target component
          and use the appropriate <code>dockPosition</code> to position the menu
        </Text>
        <DemoWidget name="Menu" width={80} style={{ marginLeft: '2rem' }}>
          {AttachedToButton}
        </DemoWidget>
      </Section>
      <Section size="md" title="Menu attached to a Icon">
        <Text>
          Menus can be docked to three positions: <code>left</code>,{' '}
          <code>right</code> or <code>center</code>. The example below shows a
          menu docked and aligned to the center of the icon.
        </Text>
        <DemoWidget name="Menu" width={120} style={{ marginLeft: '2rem' }}>
          {AttachedToIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Menu attached to a native Element">
        <Text>
          The example below shows a menu attached to a native element (button).
        </Text>
        <DemoWidget name="Menu" width={100} style={{ marginLeft: '2rem' }}>
          {AttachedToNativeElement}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
