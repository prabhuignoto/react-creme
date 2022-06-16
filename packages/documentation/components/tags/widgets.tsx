import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Link, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Accent,
  AutoComplete,
  Default,
  Disabled,
  LargeSize,
  MaxTags,
  ReadOnly,
} from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState<string | number>();

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
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Tags - default" size="md">
          <BlockQuote>
            New tags can be added to the list by typing in the input field and
            pressing enter.Tags can be easily removed by clicking on the close
            icon on the tag.
          </BlockQuote>
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Tags - Filled style" size="md">
          <BlockQuote>
            Tags can be disabled by setting the <code>disabled</code>property to
            true.
          </BlockQuote>
          <DemoWidget width={width}>{Disabled}</DemoWidget>
        </Section>
        <Section title="Tags - Readonly" size="md">
          <BlockQuote>
            In readonly mode we can display a list of non editable tags.
          </BlockQuote>
          <DemoWidget width={width}>{ReadOnly}</DemoWidget>
        </Section>
        <Section title="Max Tags" size="md">
          <BlockQuote>
            Use the <code>maxTags</code> prop to limit the number of tags.
          </BlockQuote>
          <DemoWidget width={width}>{MaxTags}</DemoWidget>
        </Section>
        <Section title="Tags - AutoComplete" size="md">
          <BlockQuote>
            Tags can also be configured to use the{' '}
            <Link href="/auto-suggest">AutoSuggest</Link> control.
          </BlockQuote>
          <DemoWidget width={width}>{AutoComplete}</DemoWidget>
        </Section>
        <Section title="Tags - Accent" size="md">
          <BlockQuote>
            Use the <code>accent</code> property to change the outlook of the
            tags. Can be one of the following: <code>flat</code>,{' '}
            <code>rounded</code>.
          </BlockQuote>
          <DemoWidget width={width}>{Accent}</DemoWidget>
        </Section>
        <Section title="Tags - Custom Size" size="md">
          <DemoWidget width={width}>{LargeSize}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
