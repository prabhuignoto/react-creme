import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Accent,
  AutoComplete,
  Default,
  Disabled,
  LargeSize,
  MaxTags,
  ReadOnly,
} from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

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
      <Section size="md" title="Tags - default">
        <Text>
          New tags can be added to the list by typing in the input field and
          pressing enter.Tags can be easily removed by clicking on the close
          icon on the tag.
        </Text>
        <DemoWidget name="Tags" width={width} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Tags - Filled style">
        <Text>
          Tags can be disabled by setting the <code>disabled</code>property to
          true.
        </Text>
        <DemoWidget name="Tags" width={width}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="Tags - Readonly">
        <Text>
          In readonly mode we can display a list of non editable tags.
        </Text>
        <DemoWidget name="Tags" width={width}>
          {ReadOnly}
        </DemoWidget>
      </Section>
      <Section size="md" title="Max Tags">
        <Text>
          Use the <code>maxTags</code> prop to limit the number of tags.
        </Text>
        <DemoWidget name="Tags" width={width}>
          {MaxTags}
        </DemoWidget>
      </Section>
      <Section size="md" title="Tags - AutoSuggest">
        <Text>
          Tags can also be configured to use with the AutoSuggest control.
        </Text>
        <DemoWidget name="Tags" width={width}>
          {AutoComplete}
        </DemoWidget>
      </Section>
      <Section size="md" title="Tags - Accent">
        <Text>
          Use the <code>accent</code> property to change the outlook of the
          tags. Can be one of the following: <code>flat</code>,{' '}
          <code>rounded</code>.
        </Text>
        <DemoWidget name="Tags" width={width}>
          {Accent}
        </DemoWidget>
      </Section>
      <Section size="md" title="Tags - Custom Size">
        <DemoWidget name="Tags" width={width}>
          {LargeSize}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
