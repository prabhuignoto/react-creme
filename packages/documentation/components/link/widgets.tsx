import { Link as LinkIcon } from 'react-feather';
import jsxToString from 'react-element-to-jsx-string';
import { Link, Section } from '../../../lib/components';
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
      <Section size="md" title="Default">
        <DemoWidget name="Link" width={100}>
          <Link href="http://www.google.com">google.com</Link>
        </DemoWidget>
      </Section>
      <Section size="md" title="Link with Icon">
        <DemoWidget name="Link" width={100}>
          <Link href="http://www.google.com" icon={<LinkIcon />}>
            Test Link
          </Link>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
