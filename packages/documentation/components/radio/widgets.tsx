import { CSSProperties, useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Radio, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
const style: CSSProperties = {
  minWidth: '50px',
};

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(200);
    } else if (media.isMobile) {
      setWidth(200);
    } else if (media.isBigScreen) {
      setWidth(200);
    } else if (media.isDesktop) {
      setWidth(200);
    } else if (media.isExtraLargeScreen) {
      setWidth(300);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <DemoWidget>
            <div style={{ ...style, width: `${width}px` }}>
              <Radio label="Radio option one" />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Checkbox disabled">
          <DemoWidget>
            <div style={{ ...style, width: `${width}px` }}>
              <Radio label="Radio option two" size="md" disabled />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Custom Size">
          <DemoWidget>
            <div style={{ ...style, width: `${width}px` }}>
              <Radio label="Radio option three" size="lg" />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
