import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  Animate,
  Circle,
  CustomBlockCount,
  CustomRowAndHeight,
  Default,
  RTL,
} from './widget-variants';

function widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isExtraLargeScreen) {
      setWidth(650);
    } else if (media.isBigScreen) {
      setWidth(550);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default rendering"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Skeleton"
          >
            <DemoWidget name="Skeleton" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="With Circle"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>Optional Circle figure can be added to the skeleton</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Circle, jsxToStringOptions)}
            language="jsx"
            componentName="Skeleton"
          >
            <DemoWidget name="Skeleton" width={width}>
              {Circle}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom row count and height"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The height of each row and the height of it can be customized.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomRowAndHeight, jsxToStringOptions)}
            language="jsx"
            componentName="Skeleton"
          >
            <DemoWidget name="Skeleton" width={width}>
              {CustomRowAndHeight}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Animated rows"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Use the <code>animate</code> prop to animate the skeleton.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Animate, jsxToStringOptions)}
            language="jsx"
            componentName="Skeleton"
          >
            <DemoWidget name="Skeleton" width={width}>
              {Animate}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom block count"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            A collection of Skeleton is a block. with the <code>blocks</code>{' '}
            prop we can also customize the number of blocks we want to be
            displayed. The example shows how to create 2 blocks with 4 rows per
            block.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomBlockCount, jsxToStringOptions)}
            language="jsx"
            componentName="Skeleton"
          >
            <DemoWidget name="Skeleton" width={width}>
              {CustomBlockCount}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="RTL"
          RTL
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="Skeleton"
          >
            <DemoWidget name="Skeleton" width={width}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default widgets;
