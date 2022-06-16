import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function index() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      pageIcon={<FontAwesomeIcon icon={faListUl} size="2x" />}
      sourceId="scroll-spy/scroll-spy.tsx"
      editId="scroll-spy"
      features={['Smart and intuitive', 'Supports RTL rendering']}
      properties={[
        {
          default: '[]',
          description: 'Array of links to scroll to',
          name: 'links',
          optional: 'Yes',
          type: 'string[]',
        },
        {
          default: 'left',
          description: 'Position of the links',
          name: 'linksPosition',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      title="Scroll Spy"
      description={`Scroll Spy is a component that allows you to track the current scroll position of a container
       and display a navigation menu with links to sections of the page or a container.`}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-tdht4j']}
    ></DemoPageRenderer>
  );
}

export default index;
