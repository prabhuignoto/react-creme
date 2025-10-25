import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import {
  ButtonRaisedRight,
  Default,
  largeSized,
  mediumSized,
  smallSized,
  Thickness,
  WithCombination,
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
      <Section size="md" title="Default rendering" border={false}>
        <DemoWidget name="Kbd">{Default}</DemoWidget>
      </Section>
      <Section size="md" title="Keyboard combinations" border={false}>
        <Text>
          Keyboard combinations allows you to render a combination of keys.
        </Text>
        <DemoWidget name="Kbd">{WithCombination}</DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes" border={false}>
        <Text>
          Three sizes are available: <code>sm</code>, <code>md</code>, and{' '}
          <code>lg</code>
        </Text>
        <DemoWidget name="Kbd">{smallSized}</DemoWidget>
        <DemoWidget name="Kbd">{mediumSized}</DemoWidget>
        <DemoWidget name="Kbd">{largeSized}</DemoWidget>
      </Section>
      <Section size="md" title="Button raised direction" border={false}>
        <Text>
          The element is raised to the right by default. This can be changed via
          the <code>buttonRaised</code> prop.
        </Text>
        <DemoWidget name="Kbd">{ButtonRaisedRight}</DemoWidget>
      </Section>
      <Section size="md" title="Keyboard Thickness" border={false}>
        <Text>
          Customize the thickness of the keyboard with the{' '}
          <code>thickness</code> prop.
        </Text>
        <DemoWidget name="Kbd">{Thickness}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
