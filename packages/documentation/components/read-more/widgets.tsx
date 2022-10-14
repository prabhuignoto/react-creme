import { useEffect, useState } from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import { Default } from './widgets-variants';

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(600);
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
      <Section size="md" title="Default">
        <DemoWidget width={width} name="Read More" showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      {/* <Section size="md" title="Custom icon">
        <DemoWidget width={width} name="Avatar" showCodeByDefault>
          {CustomIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Using letter instead of a Icon">
        <DemoWidget width={width} name="Avatar" showCodeByDefault>
          {Letter}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes">
        <DemoWidget width={width} name="Avatar" showCodeByDefault>
          {MediumSized}
        </DemoWidget>
        <DemoWidget width={width} name="Avatar" showCodeByDefault>
          {LargeSized}
        </DemoWidget>
      </Section> */}
    </div>
  ) : null;
}

export { Widgets };
