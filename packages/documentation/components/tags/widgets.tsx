import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Link, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { AutoComplete, Default, Disabled, ReadOnly } from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState<string | number>(null);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(750);
    } else if (media.isBigScreen) {
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth('85%');
    } else if (media.isMobile) {
      setWidth('90%');
    }
  }, [media]);

  const resolvedWidth = typeof width === 'string' ? width : `${width}px`;

  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Tags - default">
          <BlockQuote>
            New tags can be added to the list by typing in the input field and
            pressing enter.Tags can be easily removed by clicking on the close
            icon on the tag.
          </BlockQuote>
          <DemoWidget width={resolvedWidth}>{Default}</DemoWidget>
        </Section>
        <Section title="Tags - Filled style">
          <BlockQuote>
            Tags can be disabled by setting the <code>disabled</code>property to
            true.
          </BlockQuote>
          <DemoWidget width={resolvedWidth}>{Disabled}</DemoWidget>
        </Section>
        <Section title="Tags - Readonly">
          <BlockQuote>
            In readonly mode we can display a list of non editable tags.
          </BlockQuote>
          <DemoWidget width={resolvedWidth}>{ReadOnly}</DemoWidget>
        </Section>
        <Section title="Tags - AutoComplete">
          <BlockQuote>
            Tags can also be configured to use the{' '}
            <Link href="/auto-suggest">AutoSuggest</Link> control.
          </BlockQuote>
          <DemoWidget width={resolvedWidth}>{AutoComplete}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
