import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section, Tabs } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Default,
  Disabled,
  Icons,
  IconsCode,
  Rounded,
} from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

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
      setWidth(320);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Flat tabs" size="md">
          <BlockQuote>
            In flat mode, the tabs are rendered as a horizontal list of tabs
            with a flat accent.
          </BlockQuote>
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Rounded tabs" size="md">
          <BlockQuote>
            In rounded mode, the tabs are rendered as a horizontal list of tabs
            with rounded borders.
          </BlockQuote>
          <DemoWidget width={width}>{Rounded}</DemoWidget>
        </Section>
        <Section title="Rounded tabs with scroll" size="md">
          <BlockQuote>
            When the tabs are too long to fit in the available space, they can
            be scrolled with the help of the buttons to the right.
          </BlockQuote>
          <DemoWidget width={width}>
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
        <Section title="Flat tabs (Disabled)" size="md">
          <BlockQuote>
            Specific tabs can be disabled by passing an array of tab labels to
            the <em>disabledTabs</em> array
          </BlockQuote>
          <DemoWidget width={width}>{Disabled}</DemoWidget>
        </Section>
        <Section title="Tabs with Icons" size="md">
          <BlockQuote>
            Specific tabs can be disabled by passing an array of tab labels to
            the <em>disabledTabs</em> array
          </BlockQuote>
          <DemoWidget width={width} codeString={IconsCode}>
            {Icons}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
