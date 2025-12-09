import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Tabs, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  Default,
  Disabled,
  Icons,
  IconsCode,
  Rounded,
} from './widget-variants';

function widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState<string | number>(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(800);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(600);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(300);
    }
  }, [media]);

  const scrollableTabs = (
    <Tabs
      minHeight={250}
      labels={[
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
      ]}
      tabStyle="rounded"
      border={false}
    >
      <span>one</span>
      <span>two</span>
      <span>three</span>
      <span>four</span>
      <span>five</span>
      <span>six</span>
      <span>seven</span>
      <span>eight</span>
      <span>nine</span>
    </Tabs>
  );

  return +width > 0 || width ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Flat tabs"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            In flat mode, the tabs are rendered as a horizontal list of tabs
            with a flat accent.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Tabs"
          >
            <DemoWidget name="Tabs" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Rounded tabs"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            In rounded mode, the tabs are rendered as a horizontal list of tabs
            with rounded borders.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Rounded, jsxToStringOptions)}
            language="jsx"
            componentName="Tabs"
          >
            <DemoWidget name="Tabs" width={width}>
              {Rounded}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Rounded tabs with scroll"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            When the tabs are too long to fit in the available space, they can
            be scrolled with the help of the buttons to the right.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(scrollableTabs, jsxToStringOptions)}
            language="jsx"
            componentName="Tabs"
          >
            <DemoWidget name="Tabs" width={width}>
              {scrollableTabs}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Flat tabs (Disabled)"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Specific tabs can be disabled by passing an array of tab labels to
            the <em>disabledTabs</em> array
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="Tabs"
          >
            <DemoWidget name="Tabs" width={width}>
              {Disabled}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Tabs with Icons"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Specific tabs can be disabled by passing an array of tab labels to
            the <em>disabledTabs</em> array
          </Text>
          <HeaderCodeToggle.Content
            code={IconsCode}
            language="jsx"
            componentName="Tabs"
          >
            <DemoWidget name="Tabs" width={width}>
              {Icons}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default widgets;
