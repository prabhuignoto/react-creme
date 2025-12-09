import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
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
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Single selection"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(SingleSelection, jsxToStringOptions)}
            language="jsx"
            componentName="Dropdown"
          >
            <DemoWidget name="Dropdown" width={width}>
              {SingleSelection}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Multi selection"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>With multi selection, you can select multiple options.</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(MultiSelection, jsxToStringOptions)}
            language="jsx"
            componentName="Dropdown"
          >
            <DemoWidget name="Dropdown" width={width}>
              {MultiSelection}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Search"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Available options can be filtered by typing in the search box.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Searchable, jsxToStringOptions)}
            language="jsx"
            componentName="Dropdown"
          >
            <DemoWidget name="Dropdown" width={width}>
              {Searchable}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Virtualized"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            With virtualized, the options are rendered only when they are in the
            viewport of the menu.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Virtualized, jsxToStringOptions)}
            language="jsx"
            componentName="Dropdown"
          >
            <DemoWidget name="Dropdown" width={width}>
              {Virtualized}
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
          <Text>
            With virtualized, the options are rendered only when they are in the
            viewport of the menu.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="Dropdown"
          >
            <DemoWidget name="Dropdown" width={width}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default Widgets;
