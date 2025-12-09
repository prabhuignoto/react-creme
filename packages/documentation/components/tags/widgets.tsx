import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  Accent,
  AutoComplete,
  Default,
  Disabled,
  LargeSize,
  MaxTags,
  ReadOnly,
} from './widget-variants';

function widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState<string | number>();

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(750);
    } else if (media.isBigScreen) {
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth('100%');
    }
  }, [media]);

  return width ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Tags - default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            New tags can be added to the list by typing in the input field and
            pressing enter.Tags can be easily removed by clicking on the close
            icon on the tag.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Tags"
          >
            <DemoWidget name="Tags" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Tags - Filled style"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Tags can be disabled by setting the <code>disabled</code>property to
            true.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="Tags"
          >
            <DemoWidget name="Tags" width={width}>
              {Disabled}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Tags - Readonly"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            In readonly mode we can display a list of non editable tags.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(ReadOnly, jsxToStringOptions)}
            language="jsx"
            componentName="Tags"
          >
            <DemoWidget name="Tags" width={width}>
              {ReadOnly}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Max Tags"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Use the <code>maxTags</code> prop to limit the number of tags.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(MaxTags, jsxToStringOptions)}
            language="jsx"
            componentName="Tags"
          >
            <DemoWidget name="Tags" width={width}>
              {MaxTags}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Tags - AutoSuggest"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Tags can also be configured to use with the AutoSuggest control.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(AutoComplete, jsxToStringOptions)}
            language="jsx"
            componentName="Tags"
          >
            <DemoWidget name="Tags" width={width}>
              {AutoComplete}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Tags - Accent"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Use the <code>accent</code> property to change the outlook of the
            tags. Can be one of the following: <code>flat</code>,{' '}
            <code>rounded</code>.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Accent, jsxToStringOptions)}
            language="jsx"
            componentName="Tags"
          >
            <DemoWidget name="Tags" width={width}>
              {Accent}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Tags - Custom Size"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(LargeSize, jsxToStringOptions)}
            language="jsx"
            componentName="Tags"
          >
            <DemoWidget name="Tags" width={width}>
              {LargeSize}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default widgets;
