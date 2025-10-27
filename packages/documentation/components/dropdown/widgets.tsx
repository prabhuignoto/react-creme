import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  MultiSelection,
  RTL,
  Searchable,
  SingleSelection,
  Virtualized,
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
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);
  return width ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Single selection" border={false}>
        <DemoWidget name="Dropdown" width={width}>
          {SingleSelection}
        </DemoWidget>
      </Section>
      <Section size="md" title="Multi selection" border={false}>
        <Text>With multi selection, you can select multiple options.</Text>
        <DemoWidget name="Dropdown" width={width} showCodeByDefault={true}>
          {MultiSelection}
        </DemoWidget>
      </Section>
      <Section size="md" title="Search" border={false}>
        <Text>
          Available options can be filtered by typing in the search box.
        </Text>
        <DemoWidget name="Dropdown" width={width} showCodeByDefault={true}>
          {Searchable}
        </DemoWidget>
      </Section>
      <Section size="md" title="Virtualized" border={false}>
        <Text>
          With virtualized, the options are rendered only when they are in the
          viewport of the menu.
        </Text>
        <DemoWidget name="Dropdown" width={width} showCodeByDefault={true}>
          {Virtualized}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL" border={false}>
        <Text>
          With virtualized, the options are rendered only when they are in the
          viewport of the menu.
        </Text>
        <DemoWidget name="Dropdown" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
