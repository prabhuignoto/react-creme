import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
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
            New tags can be added to the list by typing in the input field.Tags
            can be removed by clicking on the close icon on the tag.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>{Default}</div>
          </DemoWidget>
        </Section>
        <Section title="Tags - Filled style">
          <BlockQuote>
            Tags can be disabled by setting the disabled property to true.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>{Disabled}</div>
          </DemoWidget>
        </Section>
        <Section title="Tags - Readonly">
          <BlockQuote>
            In readonly mode, you can only select the tags that are already in
            the list.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>{ReadOnly}</div>
          </DemoWidget>
        </Section>
        <Section title="Tags - AutoComplete">
          <BlockQuote>
            In readonly mode, you can only select the tags that are already in
            the list.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>{AutoComplete}</div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
