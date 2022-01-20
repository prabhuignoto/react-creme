import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function index() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      pageIcon={<FontAwesomeIcon icon={faListUl} size="2x" />}
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
