import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  MultiSelection,
  RTL,
  Searchable,
  SingleSelection,
  Virtualized,
} from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
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
      setWidth(320);
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);
  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Single selection" size="md">
          <DemoWidget name="Dropdown" width={width}>
            {SingleSelection}
          </DemoWidget>
        </Section>
        <Section title="Multi selection" size="md">
          <BlockQuote>
            With multi selection, you can select multiple options.
          </BlockQuote>
          <DemoWidget name="Dropdown" width={width}>
            {MultiSelection}
          </DemoWidget>
        </Section>
        <Section title="Search" size="md">
          <BlockQuote>
            Available options can be filtered by typing in the search box.
          </BlockQuote>
          <DemoWidget name="Dropdown" width={width}>
            {Searchable}
          </DemoWidget>
        </Section>
        <Section title="Virtualized" size="md">
          <BlockQuote>
            With virtualized, the options are rendered only when they are in the
            viewport of the menu.
          </BlockQuote>
          <DemoWidget name="Dropdown" width={width}>
            {Virtualized}
          </DemoWidget>
        </Section>
        <Section title="RTL" size="md">
          <BlockQuote>
            With virtualized, the options are rendered only when they are in the
            viewport of the menu.
          </BlockQuote>
          <DemoWidget name="Dropdown" width={width}>
            {RTL}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
