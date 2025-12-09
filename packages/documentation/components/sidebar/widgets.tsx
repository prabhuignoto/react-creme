import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Default, Searchable } from './widget-variants';

function widgets() {
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
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isExtraLargeScreen) {
      setWidth(500);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>Sections are collapsible by default.</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Sidebar"
          >
            <DemoWidget name="Sidebar" width={width} height={400}>
              {Default}
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
            Can optionally include a search bar for filtering the sidebar.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Searchable, jsxToStringOptions)}
            language="jsx"
            componentName="Sidebar"
          >
            <DemoWidget name="Sidebar" width={width} height={400}>
              {Searchable}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default widgets;
