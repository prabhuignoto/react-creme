import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Default,
  DropdownField,
  DropdownFieldCode,
  Icon,
  IconCode,
  RTL,
  State,
} from './widget-variants';

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
        <DemoWidget name="FormField" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Icon" border={false}>
        <Text>
          Use the <code>icon</code> prop to add an icon to the form field.
        </Text>
        <DemoWidget name="FormField" width={width} codeString={IconCode}>
          {Icon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Field with state" border={false}>
        <DemoWidget name="FormField" width={width}>
          {State}
        </DemoWidget>
      </Section>
      <Section size="md" title="Dropdown Field" border={false}>
        <DemoWidget
          name="FormField"
          width={width}
          codeString={DropdownFieldCode}
        >
          {DropdownField}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL Render" border={false}>
        <DemoWidget name="FormField" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
