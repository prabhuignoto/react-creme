import { useEffect, useState } from 'react';
import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import {
  CustomIcon,
  Default,
  Expanded,
  LargeSized,
  MediumSized,
} from './widgets-variants';

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(700);
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return width > 0 ? (
    <div style={{ minHeight: '1200px' }} className="rc-demo-widgets">
      <Section size="md" title="Default render">
        <DemoWidget width={width} name="Accordion">
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Icon alignment">
        <Text>The icon can be aligned to the right</Text>
        <DemoWidget width={width} name="Accordion">
          {CustomIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Accordion expanded by default">
        <Text>
          Accordions can be expanded or collapsed by default. The example shows
          a accordion expanded by default.
        </Text>
        <DemoWidget width={width} name="Accordion">
          {Expanded}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes">
        <DemoWidget width={width} name="Accordion">
          {MediumSized}
        </DemoWidget>
        <DemoWidget width={width} name="Accordion">
          {LargeSized}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export { Widgets };
