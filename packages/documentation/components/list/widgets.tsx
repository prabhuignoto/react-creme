import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Section, Text } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Default,
  MultiSelection,
  Search,
  Virtualized,
} from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(500);
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section size="md" title="Default">
          <DemoWidget name="List" width={width}>
            {Default}
          </DemoWidget>
        </Section>
        <Section size="md" title="Multi selection mode">
          <Text>In Multi selection mode you can select multiple items.</Text>
          <DemoWidget name="List" width={width}>
            {MultiSelection}
          </DemoWidget>
        </Section>
        <Section size="md" title="Searchable list">
          <Text>With searchable list items can be quickly searched.</Text>
          <DemoWidget name="List" width={width} showCodeByDefault={false}>
            {Search}
          </DemoWidget>
        </Section>
        <Section size="md" title="Virtualized">
          <Text>
            The virtualized list is a performance improvement over the default
            rendering. It renders only the visible items
          </Text>
          <DemoWidget name="List" width={width} showCodeByDefault={false}>
            {Virtualized}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
