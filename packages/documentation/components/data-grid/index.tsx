import { faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import './data-grid.scss';
import Widgets from './widgets';

const DataGridDemo: React.FunctionComponent = () => {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Data Grid"
      description={`The Data grid is a simple data table that can be used to display a collection of records.`}
      pageIcon={<FontAwesomeIcon icon={faTable} size="2x" />}
      editId="data-grid"
      sourceId="data-grid/data-grid.tsx"
      features={[
        'Supports two layouts. Comfortable or Compact',
        'Sortable',
        'Two different outlooks for the table via the border property',
        'Zebra rendering',
      ]}
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
        {
          default: 'sm',
          description:
            'Sets the size of the grid. can be <em>sm</em>, <em>md</em> or <em>lg</em>. Controls the font size of the grid.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-vebq81']}
    ></DemoPageRenderer>
  );
};

export default DataGridDemo;
