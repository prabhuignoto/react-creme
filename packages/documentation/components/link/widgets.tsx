import React from 'react';
import { Link as LinkIcon } from 'react-feather';
import { Link, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render">
        <DemoWidget width={100}>
          <Link href="http://www.google.com">Mulugu</Link>
        </DemoWidget>
      </Section>
      <Section title="Link with Icon">
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
