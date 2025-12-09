import jsxToString from 'react-element-to-jsx-string';
import { CSSProperties, useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Radio, Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';

const style: CSSProperties = {
  minWidth: '50px',
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

  const defaultRadio = (
    <div style={{ ...style, width: `${width}px` }}>
      <Radio label="Radio option one" />
    </div>
  );
  const disabledRadio = (
    <div style={{ ...style, width: `${width}px` }}>
      <Radio label="Radio option two" size="md" disabled />
    </div>
  );
  const customSizeRadio = (
    <div style={{ ...style, width: `${width}px` }}>
      <Radio label="Radio option three" size="lg" />
    </div>
  );

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(defaultRadio, jsxToStringOptions)}
            language="jsx"
            componentName="Radio"
          >
            <DemoWidget name="Radio">{defaultRadio}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Checkbox disabled"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(disabledRadio, jsxToStringOptions)}
            language="jsx"
            componentName="Radio"
          >
            <DemoWidget name="Radio">{disabledRadio}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom Size"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(customSizeRadio, jsxToStringOptions)}
            language="jsx"
            componentName="Radio"
          >
            <DemoWidget name="Radio">{customSizeRadio}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default widgets;
