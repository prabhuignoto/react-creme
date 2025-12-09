import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  AttachedToButton,
  AttachedToIcon,
  AttachedToNativeElement,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Menu attached to a Button" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Menus can be attached to <code>react-creme</code> components or even
            native elements. Simply wrap the Menu control in the target
            component and use the appropriate <code>dockPosition</code> to
            position the menu
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(AttachedToButton, jsxToStringOptions)}
            language="jsx"
            componentName="Menu"
          >
            <DemoWidget name="Menu" width={80} style={{ marginLeft: '2rem' }}>
              {AttachedToButton}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Docking positions" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Menus can be docked to three positions: <code>left</code>,{' '}
            <code>right</code> or <code>center</code>. The example below shows a
            menu docked and aligned to the center of the button.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(AttachedToIcon, jsxToStringOptions)}
            language="jsx"
            componentName="Menu"
          >
            <DemoWidget name="Menu" width={120} style={{ marginLeft: '2rem' }}>
              {AttachedToIcon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Menu attached to a native Element"
          border={false}
        >
          <HeaderCodeToggle.Button />
          <Text>
            The example below shows a menu attached to a native element
            (button).
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(AttachedToNativeElement, jsxToStringOptions)}
            language="jsx"
            componentName="Menu"
          >
            <DemoWidget name="Menu" width={100} style={{ marginLeft: '2rem' }}>
              {AttachedToNativeElement}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
