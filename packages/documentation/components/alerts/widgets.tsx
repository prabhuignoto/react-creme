import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  Custom,
  Dismiss,
  Error,
  Information,
  Success,
  Warning,
} from './widget-variants';

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(700);
    } else if (media.isBigScreen) {
      setWidth(600);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Informational Text"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Alerts can be closed or dismissed by default. Use the{' '}
            <code>canDismiss</code> prop to change this behavior.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Information, jsxToStringOptions)}
            language="jsx"
            componentName="Alert"
          >
            <DemoWidget name="Alert" width={width}>
              {Information}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Dismissible Alert"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Dismiss, jsxToStringOptions)}
            language="jsx"
            componentName="Alert"
          >
            <DemoWidget name="Alert" width={width}>
              {Dismiss}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Success Message"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Success, jsxToStringOptions)}
            language="jsx"
            componentName="Alert"
          >
            <DemoWidget name="Alert" width={width}>
              {Success}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Warning Message"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Warning, jsxToStringOptions)}
            language="jsx"
            componentName="Alert"
          >
            <DemoWidget name="Alert" width={width}>
              {Warning}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Error Message"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Error, jsxToStringOptions)}
            language="jsx"
            componentName="Alert"
          >
            <DemoWidget name="Alert" width={width}>
              {Error}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Render Custom content"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Custom, jsxToStringOptions)}
            language="jsx"
            componentName="Alert"
          >
            <DemoWidget name="Alert" width={width}>
              {Custom}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default Widgets;
