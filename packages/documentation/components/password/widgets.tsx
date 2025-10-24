import jsxToString from 'react-element-to-jsx-string';
import { Section } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Large, Medium, RTL } from './widget-variants';

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
      <Section size="md" title="Default">
        <DemoWidget name="Password" width={320} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="Password" width={320} showCodeByDefault>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Sizes">
        <DemoWidget name="Password" width={320} showCodeByDefault>
          {Medium}
        </DemoWidget>
        <DemoWidget name="Password" width={320} showCodeByDefault>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
