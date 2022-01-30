import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function index() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Section"
      description="Section is a container for other components. It can be used to group components together."
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-2fdwsf']}
      pageIcon={<FontAwesomeIcon icon={faSquare} size="2x" />}
      sourceId="section/section.tsx"
      editId="section"
      properties={[
        {
          default: '',
          description: 'Title of the section',
          name: 'title',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '150',
          description: 'Minimum height of the section',
          name: 'height',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'row',
          description:
            'Layout of the section. can be <em>row</em> or <em>column</em>',
          name: 'layout',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'False',
          description: 'Right to Left',
          name: 'RTL',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description:
            'Size of the page header. can be <em>sm</em> or <em>md</em> or <em>lg</em>.',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default index;
