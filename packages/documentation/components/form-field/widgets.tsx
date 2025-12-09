import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  Default,
  DropdownField,
  DropdownFieldCode,
  Icon,
  IconCode,
  RTL,
  State,
} from './widget-variants';

function Widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState<string | number>(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(400);
    } else if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth('100%');
    } else if (media.isBigScreen) {
      setWidth(350);
    } else if (media.isDesktop) {
      setWidth(400);
    }
  }, [media]);
  return width ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="FormField"
          >
            <DemoWidget name="FormField" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom Icon"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Use the <code>icon</code> prop to add an icon to the form field.
          </Text>
          <HeaderCodeToggle.Content
            code={IconCode}
            language="jsx"
            componentName="FormField"
          >
            <DemoWidget name="FormField" width={width}>
              {Icon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Field with state"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(State, jsxToStringOptions)}
            language="jsx"
            componentName="FormField"
          >
            <DemoWidget name="FormField" width={width}>
              {State}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Dropdown Field"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={DropdownFieldCode}
            language="jsx"
            componentName="FormField"
          >
            <DemoWidget name="FormField" width={width}>
              {DropdownField}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="RTL Render"
          RTL
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="FormField"
          >
            <DemoWidget name="FormField" width={width}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default Widgets;
