import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, WithImages } from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

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
      <Section size="md" title="Default" border={false}>
        <Text>
          Here we have created a 3 x 3 grid using the inbuilt Image component.
        </Text>
        <DemoWidget name="Gallery" width={width} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="From Image URL's" border={false}>
        <Text>{`Gallery can be created using just the Image URL's.`}</Text>
        <DemoWidget name="Gallery" width={width} showCodeByDefault>
          {WithImages}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
