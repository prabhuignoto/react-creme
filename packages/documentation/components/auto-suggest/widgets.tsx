import jsxToString from 'react-element-to-jsx-string';
import { Section } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { Accent, Default, Large, Medium, RTL } from './widget-variants';

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
      <Section size="md" title="Default" border={false}>
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={true}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Rounded Accent" border={false}>
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={true}>
          {Accent}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL" border={false}>
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={true}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes" border={false}>
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={true}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={true}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
