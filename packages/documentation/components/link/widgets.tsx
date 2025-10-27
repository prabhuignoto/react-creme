import { Link as LinkIcon } from 'react-feather';
import jsxToString from 'react-element-to-jsx-string';
import { Link, Section } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default" border={false}>
        <DemoWidget name="Link" width={100}>
          <Link href="http://www.google.com">google.com</Link>
        </DemoWidget>
      </Section>
      <Section size="md" title="Link with Icon" border={false}>
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
