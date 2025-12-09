import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Default, RTL, Searchable } from './widget-variants';

function widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(800);
    } else if (media.isBigScreen) {
      setWidth(700);
    } else if (media.isDesktop) {
      setWidth(650);
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
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Transfer"
          >
            <DemoWidget name="Transfer" width={width}>
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
          <HeaderCodeToggle.Content
            code={jsxToString(Searchable, jsxToStringOptions)}
            language="jsx"
            componentName="Transfer"
          >
            <DemoWidget name="Transfer" width={width}>
              {Searchable}
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
            componentName="Transfer"
          >
            <DemoWidget name="Transfer" width={width}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default widgets;
