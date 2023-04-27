import { useEffect, useState } from 'react';
import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import {
  CustomIconCodeString,
  DefaultCodeString,
  ExpandedCodeString,
  LargeSizedCodeString,
  MediumSizedCodeString,
  RTLCodeString,
} from './code-strings';
import {
  CustomIcon,
  Default,
  Expanded,
  LargeSized,
  MediumSized,
  RTL,
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
      <Section size="md" title="Default">
        <DemoWidget
          width={width}
          name="Accordion"
          codeString={DefaultCodeString}
        >
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        {/* <Text>The icon can be aligned to the right</Text> */}
        <DemoWidget width={width} name="Accordion" codeString={RTLCodeString}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Accordion expanded by default">
        <Text>
          Accordions can be expanded or collapsed by default. The example shows
          a accordion expanded by default.
        </Text>
        <DemoWidget
          width={width}
          name="Accordion"
          codeString={ExpandedCodeString}
        >
          {Expanded}
        </DemoWidget>
      </Section>
      <Section>
        <DemoWidget
          width={width}
          name="Accordion"
          codeString={CustomIconCodeString}
        >
          {CustomIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes">
        <DemoWidget
          width={width}
          name="Accordion"
          codeString={MediumSizedCodeString}
        >
          {MediumSized}
        </DemoWidget>
        <DemoWidget
          width={width}
          name="Accordion"
          codeString={LargeSizedCodeString}
        >
          {LargeSized}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export { Widgets };
