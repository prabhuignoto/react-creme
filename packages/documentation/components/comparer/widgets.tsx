import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Horizontal, Vertical } from './widget-variants';

function Widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState<string | number>('100%');
  const [height, setHeight] = useState<string | number>(450);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(850);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(500);
      setHeight(300);
    } else if (media.isTablet) {
      setWidth(450);
      setHeight(300);
    } else if (media.isMobile) {
      setWidth(350);
      setHeight(200);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Horizontal Comparison" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Compare two images side by side horizontally. The drag handle guides
            the user to the correct position.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Horizontal, jsxToStringOptions)}
            language="jsx"
            componentName="ImageComparer"
          >
            <DemoWidget name="ImageComparer" height={height} width={width}>
              {Horizontal}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Vertical comparison" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Compare two images side by side vertically. The drag handle guides
            the user to the correct position.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Vertical, jsxToStringOptions)}
            language="jsx"
            componentName="ImageComparer"
          >
            <DemoWidget name="ImageComparer" height={height} width={width}>
              {Vertical}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
