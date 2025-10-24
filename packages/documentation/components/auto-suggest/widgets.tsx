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
      <Section size="md" title="Default">
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Rounded Accent">
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {Accent}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes">
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
