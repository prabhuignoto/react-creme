import jsxToString from 'react-element-to-jsx-string';
import { useEffect, useState } from 'react';
import { Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  CustomIcon,
  Default,
  LargeSized,
  Letter,
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
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Avatar"
          >
            <DemoWidget width={width} name="Avatar">
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom icon"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(CustomIcon, jsxToStringOptions)}
            language="jsx"
            componentName="Avatar"
          >
            <DemoWidget width={width} name="Avatar">
              {CustomIcon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Using letter instead of a Icon"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Letter, jsxToStringOptions)}
            language="jsx"
            componentName="Avatar"
          >
            <DemoWidget width={width} name="Avatar">
              {Letter}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom sizes"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(MediumSized, jsxToStringOptions)}
            language="jsx"
            componentName="Avatar"
          >
            <DemoWidget width={width} name="Avatar">
              {MediumSized}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Large Size"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(LargeSized, jsxToStringOptions)}
            language="jsx"
            componentName="Avatar"
          >
            <DemoWidget width={width} name="Avatar">
              {LargeSized}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export { Widgets };
