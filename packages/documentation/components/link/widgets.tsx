import { Link as LinkIcon } from 'react-feather';
import { Link, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render" size="md">
        <DemoWidget width={100}>
          <Link href="http://www.google.com">google.com</Link>
        </DemoWidget>
      </Section>
      <Section title="Link with Icon" size="md">
        <DemoWidget width={100}>
          <Link href="http://www.google.com" icon={<LinkIcon />}>
            Test Link
          </Link>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
