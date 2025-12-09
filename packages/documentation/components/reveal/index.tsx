import { Eye } from 'lucide-react';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function reveal() {
  return (
    <DemoPageRenderer
      title="Reveal"
      description="Reveals content when a user scrolls to it."
      demoWidget={<Widgets />}
      properties={[]}
      tabTitles={['Examples', 'Properties', 'Playground']}
      pageIcon={<Eye size={32} />}
      sourceId="reveal/reveal.tsx"
      editId="reveal"
    ></DemoPageRenderer>
  );
}

export default reveal;
