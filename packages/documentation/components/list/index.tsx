import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function list() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="List"
      description={`The List component can be used to display a list of items.
      The component comes with an option to quickly search through the items. With virtualization, the list only renders the items that are in the visible region.`}
      pageIcon={<FontAwesomeIcon icon={faList} size="2x" />}
      sourceId="list/list.tsx"
      editId="list"
      features={[
        'Single or Multiple selection',
        'Searchable list',
        'Virtualized list for improved performance',
        'Custom sizes',
      ]}
      callbacks={[
        {
          default: 'undefined',
          description: 'Callback for selection',
          name: 'onSelection',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'false',
          description: 'Allow multiple selection',
          name: 'allowMultiSelection',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Remove border',
          name: 'borderLess',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: '45',
          description: 'sets the height of each item',
          name: 'itemHeight',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '600',
          description: 'sets the max height of the list',
          name: 'maxHeight',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '100',
          description: 'sets the min height of the list',
          name: 'minHeight',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'false',
          description: 'Disable unique ids',
          name: 'noUniqueIds',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: '[]',
          description: 'List of options',
          name: 'options',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: '10',
          description: 'sets the gap between rows',
          name: 'rowGap',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'true',
          description: 'Show check icon',
          name: 'showCheckIcon',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Enable virtualized list',
          name: 'virtualized',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Enable focusable list',
          name: 'focusable',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'supports RTL languages',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'sm',
          description:
            'size of the list. can be <em>sm</em>, <em>md</em> or <em>lg</em>',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-18dr2b']}
    ></DemoPageRenderer>
  );
}

export default list;
