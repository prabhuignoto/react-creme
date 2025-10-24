import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomIcon,
  CustomSize,
  Default,
  RTL,
  SelectedIndex,
  Slash,
} from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default">
        <DemoWidget name="BreadCrumb" width={450}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Icon - slash">
        <Text>
          The icon can be changed by setting the <code>icon</code> property to
          any of the values <code>slash</code> <code>arrow</code> or{' '}
          <code>chevron</code>.
        </Text>
        <DemoWidget name="BreadCrumb" width={450}>
          {Slash}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Icon - arrow">
        <DemoWidget name="BreadCrumb" width={450}>
          {CustomIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Size - Medium">
        <Text>
          The size can be changed by setting the <code>size</code> property to{' '}
          <code>sm</code> <code>md</code> or <code>lg</code>.
        </Text>
        <DemoWidget name="BreadCrumb" width={450}>
          {SelectedIndex}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Size - Large">
        <DemoWidget name="BreadCrumb" width={400}>
          {CustomSize}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="BreadCrumb" width={400}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
