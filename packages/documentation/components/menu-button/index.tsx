import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function menuButton() {
  return (
    <DemoPageRenderer
      title="Menu Button"
      description="MenuButton allows to choose an action from a list of actions"
      pageIcon={<FontAwesomeIcon icon={faHandPointUp} size="2x" />}
      callbacks={[
        {
          default: '',
          description: `Callback fired when a menu items is selected`,
          name: 'onSelected',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'choose an option',
          description: `placeholder text for the button`,
          name: 'placeholder',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '[]',
          description: `Collection of Menu Items`,
          name: 'items',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: 'left',
          description: `Docking position of the menu.
          <br> <em>left</em> | <em>center</em> | <em>right</em>`,
          name: 'position',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '',
          description: `makes the component focusable via keyboard`,
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '150',
          description: `minimum width of the menu button`,
          name: 'width',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'False',
          description: `Right to Left`,
          name: 'RTL',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '',
          description: `color of the chevron icon`,
          name: 'iconColor',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-kdxxkx']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default menuButton;
