import { Move } from 'lucide-react';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function Position() {
  return (
    <DemoPageRenderer
      title="usePosition"
      description="A hook to position a target element relative to a container element."
      features={['12 positions', 'Easy positioning']}
      properties={[]}
      tabTitles={['Examples', 'Playground']}
      demoWidget={<Widgets />}
      stackBlitzCodes={['react-ts-un6jde']}
      sourceId="common/effects/usePosition.ts"
      editId="position"
      pageIcon={<Move size={32} />}
    ></DemoPageRenderer>
  );
}

export default Position;
