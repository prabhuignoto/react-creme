import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Searchable } from './widget-variants';

function widgets() {
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
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isExtraLargeScreen) {
      setWidth(500);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default" border={false}>
        <Text>Sections are collapsible by default.</Text>
        <DemoWidget name="Sidebar" width={width} height={400}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Search" border={false}>
        <Text>
          Can optionally include a search bar for filtering the sidebar.
        </Text>
        <DemoWidget name="Sidebar" width={width} height={400}>
          {Searchable}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
