import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomIcon,
  CustomIconCount,
  CustomSize,
  Default,
  Disabled,
  RTL,
} from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Rating default" border={false}>
        <DemoWidget name="Rate" width={200}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom icon count" border={false}>
        <Text>
          Use the <code>iconCount</code> prop to customize the number of icons.
          The example renders the component with 3 icons.
        </Text>
        <DemoWidget name="Rate" width={200}>
          {CustomIconCount}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Icon" border={false}>
        <Text>
          Customize the icon with the <code>icon</code> prop.
        </Text>
        <DemoWidget name="Rate" width={200}>
          {CustomIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom size" border={false}>
        <Text>
          Choose a custom size with the <code>size</code> prop. The prop value
          can be <code>sm</code>, <code>md</code> or <code>lg</code>.
        </Text>
        <DemoWidget name="Rate" width={200}>
          {CustomSize}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled state" border={false}>
        <DemoWidget name="Rate" width={200}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL" border={false}>
        <DemoWidget name="Rate" width={200}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
