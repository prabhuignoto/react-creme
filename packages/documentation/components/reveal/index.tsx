import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function reveal() {
  return (
    <DemoPageRenderer
      title="Reveal"
      description="Reveals content when a user scrolls to it."
      demoWidget={<Widgets />}
      properties={[]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      pageIcon={<FontAwesomeIcon icon={faEye} size="2x" />}
      sourceId="reveal/reveal.tsx"
      editId="reveal"
    ></DemoPageRenderer>
  );
}

export default reveal;
