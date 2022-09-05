import { Link as LinkIcon } from 'react-feather';
import { Link, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default Render">
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
