import { faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import './data-grid.scss';

const DataGridDemo: React.FunctionComponent = () => {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      title="Data Grid"
      description="Data Grid is a component that displays data in a table format."
      pageIcon={<FontAwesomeIcon icon={faTable} size="2x" />}
      editId="data-grid"
      sourceId="data-grid/data-grid.tsx"
      properties={[
        {
          default: 'comfortable',
          description:
            'Sets the layout style of the grid. can be <em>comfortable</em> or <em>compact</em>',
          name: 'layoutStyle',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '[]',
          description: 'Columns configuration.',
          name: 'columns',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: '[]',
          description: 'Row data.',
          name: 'data',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: 'False',
          description: 'Alternates the background color of the grid rows',
          name: 'zebra',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '',
          description: 'Sets the height of the grid row',
          name: 'rowHeight',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'false',
          description: 'Makes the height of the grid as fixed',
          name: 'fixedHeight',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-vebq81']}
    ></DemoPageRenderer>
  );
};

export default DataGridDemo;
