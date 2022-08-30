import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
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
  const media = useRecoilValue(responsiveState);
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
      <Section title="Default render" size="md">
        <DemoWidget name="FormField" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="Custom Icon" size="md">
        <BlockQuote>
          Use the <code>icon</code> prop to add an icon to the form field.
        </BlockQuote>
        <DemoWidget name="FormField" width={width} codeString={IconCode}>
          {Icon}
        </DemoWidget>
      </Section>
      <Section title="Field with state" size="md">
        <DemoWidget name="FormField" width={width}>
          {State}
        </DemoWidget>
      </Section>
      <Section title="Dropdown Field" size="md">
        <DemoWidget
          name="FormField"
          width={width}
          codeString={DropdownFieldCode}
        >
          {DropdownField}
        </DemoWidget>
      </Section>
      <Section title="RTL Render" size="md">
        <DemoWidget name="FormField" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
