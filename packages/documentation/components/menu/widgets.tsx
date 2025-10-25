import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import {
  AttachedToButton,
  AttachedToIcon,
  AttachedToNativeElement,
} from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Menu attached to a Button" border={false}>
        <Text>
          Menus can be attached to <code>react-creme</code> components or even
          native elements. Simply wrap the Menu control in the target component
          and use the appropriate <code>dockPosition</code> to position the menu
        </Text>
        <DemoWidget
          name="Menu"
          width={80}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {AttachedToButton}
        </DemoWidget>
      </Section>
      <Section size="md" title="Docking positions" border={false}>
        <Text>
          Menus can be docked to three positions: <code>left</code>,{' '}
          <code>right</code> or <code>center</code>. The example below shows a
          menu docked and aligned to the center of the button.
        </Text>
        <DemoWidget
          name="Menu"
          width={120}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {AttachedToIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Menu attached to a native Element" border={false}>
        <Text>
          The example below shows a menu attached to a native element (button).
        </Text>
        <DemoWidget
          name="Menu"
          width={100}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {AttachedToNativeElement}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
