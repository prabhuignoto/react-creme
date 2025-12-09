import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Default, WithImages } from './widget-variants';

function Widgets() {
  const media = useAtomValue(responsiveState);
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
      setWidth(350);
    } else if (media.isDesktop) {
      setWidth(400);
    }
  }, [media]);
  return width ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Here we have created a 3 x 3 grid using the inbuilt Image component.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Gallery"
          >
            <DemoWidget name="Gallery" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="From Image URL's"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>{`Gallery can be created using just the Image URL's.`}</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(WithImages, jsxToStringOptions)}
            language="jsx"
            componentName="Gallery"
          >
            <DemoWidget name="Gallery" width={width}>
              {WithImages}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default Widgets;
