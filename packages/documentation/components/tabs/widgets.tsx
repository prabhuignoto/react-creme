import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Section, Tabs, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
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

  return +width > 0 || width ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Flat tabs" border={false}>
        <Text>
          In flat mode, the tabs are rendered as a horizontal list of tabs with
          a flat accent.
        </Text>
        <DemoWidget name="Tabs" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Rounded tabs" border={false}>
        <Text>
          In rounded mode, the tabs are rendered as a horizontal list of tabs
          with rounded borders.
        </Text>
        <DemoWidget name="Tabs" width={width}>
          {Rounded}
        </DemoWidget>
      </Section>
      <Section size="md" title="Rounded tabs with scroll" border={false}>
        <Text>
          When the tabs are too long to fit in the available space, they can be
          scrolled with the help of the buttons to the right.
        </Text>
        <DemoWidget name="Tabs" width={width}>
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
        </DemoWidget>
      </Section>
      <Section size="md" title="Flat tabs (Disabled)" border={false}>
        <Text>
          Specific tabs can be disabled by passing an array of tab labels to the{' '}
          <em>disabledTabs</em> array
        </Text>
        <DemoWidget name="Tabs" width={width}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="Tabs with Icons" border={false}>
        <Text>
          Specific tabs can be disabled by passing an array of tab labels to the{' '}
          <em>disabledTabs</em> array
        </Text>
        <DemoWidget name="Tabs" width={width} codeString={IconsCode}>
          {Icons}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
