import { CSSProperties, useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Radio, Section } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

const style: CSSProperties = {
  minWidth: '50px',
};

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function widgets() {
  const media = useAtomValue(responsiveState);
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

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default" border={false}>
        <DemoWidget name="Radio">
          <div style={{ ...style, width: `${width}px` }}>
            <Radio label="Radio option one" />
          </div>
        </DemoWidget>
      </Section>
      <Section size="md" title="Checkbox disabled" border={false}>
        <DemoWidget name="Radio">
          <div style={{ ...style, width: `${width}px` }}>
            <Radio label="Radio option two" size="md" disabled />
          </div>
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Size" border={false}>
        <DemoWidget name="Radio">
          <div style={{ ...style, width: `${width}px` }}>
            <Radio label="Radio option three" size="lg" />
          </div>
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
