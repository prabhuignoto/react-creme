import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Default,
  Icons,
  IconsCode,
  Large,
  Medium,
  RTL,
} from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function Widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isBigScreen) {
      setWidth(600);
    } else if (media.isDesktop) {
      setWidth(600);
    } else if (media.isExtraLargeScreen) {
      setWidth(750);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default">
        <DemoWidget name="MenuBar" width={width} style={{ marginLeft: '2rem' }}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <Text>
          Use the <code>RTL</code> prop for right to left alignment
        </Text>
        <DemoWidget name="MenuBar" width={width} style={{ marginLeft: '2rem' }}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Icons">
        <Text>
          The <code>icons</code> prop can be used to add a custom icon for each
          top level menu bar item
        </Text>
        <DemoWidget
          name="MenuBar"
          width={width}
          style={{ marginLeft: '2rem' }}
          codeString={IconsCode}
        >
          {Icons}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Sizes">
        <Text>
          With the <code>size</code> prop customize the size of the menu bar.
        </Text>
        <DemoWidget name="MenuBar" width={width} style={{ marginLeft: '2rem' }}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="MenuBar" width={width} style={{ marginLeft: '2rem' }}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
