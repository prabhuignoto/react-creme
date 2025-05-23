import { faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import DemoPageRenderer from '../../common/demo-page-renderer';
import './data-grid.scss';
// import Widgets from './widgets';

const Widgets = React.lazy(() => import('./widgets'));

const Description = (
  <div>
    <p className="rc-component-description">
      A data grid UI component is a visual representation of data in a
      structured table format, typically displayed within a graphical user
      interface (GUI). It allows users to view and manipulate large sets of data
      in an organized and efficient manner. Data grids typically include
      features such as sorting, filtering, pagination, and column resizing.
    </p>
  </div>
);

const DataGridDemo: React.FunctionComponent = () => {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Data Grid"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faTable} size="2x" />}
      editId="data-grid"
      sourceId="data-grid/data-grid.tsx"
      features={[
        'Supports two layouts. Comfortable or Compact',
        'Sortable',
        'Quick Search',
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
      tabTitles={['Examples', 'Properties']}
    ></DemoPageRenderer>
  );
};

export default DataGridDemo;
