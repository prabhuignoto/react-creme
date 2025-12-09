import { useEffect, useState } from 'react';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
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
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Default" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={DefaultCodeString}
            language="jsx"
            componentName="Accordion"
          >
            <DemoWidget width={width} name="Accordion">
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="RTL" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={RTLCodeString}
            language="jsx"
            componentName="Accordion"
          >
            <DemoWidget width={width} name="Accordion">
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Accordion expanded by default" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Accordions can be expanded or collapsed by default. The example
            shows a accordion expanded by default.
          </Text>
          <HeaderCodeToggle.Content
            code={ExpandedCodeString}
            language="jsx"
            componentName="Accordion"
          >
            <DemoWidget width={width} name="Accordion">
              {Expanded}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={CustomIconCodeString}
            language="jsx"
            componentName="Accordion"
          >
            <DemoWidget width={width} name="Accordion">
              {CustomIcon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Custom sizes" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={MediumSizedCodeString}
            language="jsx"
            componentName="Accordion"
          >
            <DemoWidget width={width} name="Accordion">
              {MediumSized}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Large Size" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={LargeSizedCodeString}
            language="jsx"
            componentName="Accordion"
          >
            <DemoWidget width={width} name="Accordion">
              {LargeSized}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export { Widgets };
