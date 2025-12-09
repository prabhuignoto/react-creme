import jsxToString from 'react-element-to-jsx-string';
import { Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { MenuButton } from '../../../lib/components/menu-button/menu-button';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';

function widgets() {
  const defaultMenuButton = (
    <MenuButton
      items={['save', 'save as new', 'discard']}
      width={100}
      size="sm"
    />
  );
  const rtlMenuButton = (
    <MenuButton items={['save', 'save as new', 'discard']} width={100} RTL />
  );
  const customSizeMenuButton = (
    <MenuButton
      size="md"
      items={['save', 'save as new', 'discard']}
      width={100}
      RTL
    />
  );

  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(defaultMenuButton, jsxToStringOptions)}
            language="jsx"
            componentName="MenuButton"
          >
            <DemoWidget
              name="MenuButton"
              width={100}
              style={{ marginLeft: '10px' }}
            >
              {defaultMenuButton}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Right to Left"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(rtlMenuButton, jsxToStringOptions)}
            language="jsx"
            componentName="MenuButton"
          >
            <DemoWidget name="MenuButton" style={{ marginLeft: '10px' }}>
              {rtlMenuButton}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom sizes"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(customSizeMenuButton, jsxToStringOptions)}
            language="jsx"
            componentName="MenuButton"
          >
            <DemoWidget name="MenuButton" style={{ marginLeft: '10px' }}>
              {customSizeMenuButton}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
