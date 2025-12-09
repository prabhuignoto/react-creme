import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { CustomImage, CustomImageCode, Default } from './widget-variants';

function widgets() {
  // const media = useMedia();

  const [width, setWidth] = useState(0);

  const responsive = useAtomValue(responsiveState);

  useLayoutEffect(() => {
    if (!responsive) {
      return;
    }

    if (responsive.isExtraLargeScreen) {
      setWidth(550);
    } else if (responsive.isBigScreen) {
      setWidth(550);
    } else if (responsive.isDesktop) {
      setWidth(500);
    } else if (responsive.isTablet) {
      setWidth(450);
    } else if (responsive.isMobile) {
      setWidth(320);
    }
  }, [responsive]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Card shadowed"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The <code>header</code> and <code>footer</code> props allows to
            render custom contents in the card header and footer.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Card"
          >
            <DemoWidget name="Card" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Card without shadow"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>Card with no shadow but with a border.</Text>
          <HeaderCodeToggle.Content
            code={CustomImageCode}
            language="jsx"
            componentName="Card"
          >
            <DemoWidget name="Card" width={width}>
              {CustomImage}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default widgets;
