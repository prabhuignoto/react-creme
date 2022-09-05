import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Section, Text } from '../../../lib/components';
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
      setWidth('100%');
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);
  return width ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Single selection">
        <DemoWidget name="Dropdown" width={width}>
          {SingleSelection}
        </DemoWidget>
      </Section>
      <Section size="md" title="Multi selection">
        <Text>With multi selection, you can select multiple options.</Text>
        <DemoWidget name="Dropdown" width={width} showCodeByDefault={false}>
          {MultiSelection}
        </DemoWidget>
      </Section>
      <Section size="md" title="Search">
        <Text>
          Available options can be filtered by typing in the search box.
        </Text>
        <DemoWidget name="Dropdown" width={width} showCodeByDefault={false}>
          {Searchable}
        </DemoWidget>
      </Section>
      <Section size="md" title="Virtualized">
        <Text>
          With virtualized, the options are rendered only when they are in the
          viewport of the menu.
        </Text>
        <DemoWidget name="Dropdown" width={width} showCodeByDefault={false}>
          {Virtualized}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <Text>
          With virtualized, the options are rendered only when they are in the
          viewport of the menu.
        </Text>
        <DemoWidget name="Dropdown" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
