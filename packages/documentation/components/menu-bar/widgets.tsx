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
  Icons,
  IconsCode,
  Large,
  Medium,
  RTL,
} from './widget-variants';

function Widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isBigScreen) {
      setWidth(600);
    } else if (media.isDesktop) {
      setWidth(600);
    } else if (media.isExtraLargeScreen) {
      setWidth(750);
    }
  }, [media]);

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
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="MenuBar"
          >
            <DemoWidget
              name="MenuBar"
              width={width}
              style={{ marginLeft: '2rem' }}
            >
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="RTL"
          RTL
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Use the <code>RTL</code> prop for right to left alignment
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="MenuBar"
          >
            <DemoWidget
              name="MenuBar"
              width={width}
              style={{ marginLeft: '2rem' }}
            >
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Icons"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The <code>icons</code> prop can be used to add a custom icon for
            each top level menu bar item
          </Text>
          <HeaderCodeToggle.Content
            code={IconsCode}
            language="jsx"
            componentName="MenuBar"
          >
            <DemoWidget
              name="MenuBar"
              width={width}
              style={{ marginLeft: '2rem' }}
            >
              {Icons}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom Sizes"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            With the <code>size</code> prop customize the size of the menu bar.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Medium, jsxToStringOptions)}
            language="jsx"
            componentName="MenuBar"
          >
            <DemoWidget
              name="MenuBar"
              width={width}
              style={{ marginLeft: '2rem' }}
            >
              {Medium}
            </DemoWidget>
            <DemoWidget
              name="MenuBar"
              width={width}
              style={{ marginLeft: '2rem' }}
            >
              {Large}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
