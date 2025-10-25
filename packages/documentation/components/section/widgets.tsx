import jsxToString from 'react-element-to-jsx-string';
import { Section } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';

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
      <DemoWidget name="Section" fullWidth>
        <Section size="md" title="Default rendering" border={false}>
          <p>lorem ipsum </p>
        </Section>
      </DemoWidget>
      <DemoWidget name="Section" fullWidth>
        <Section size="md" title="Right to Left" RTL border={false}>
          <p>lorem ipsum </p>
        </Section>
      </DemoWidget>
    </div>
  );
}

export default Widgets;
