import { faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function formGroup() {
  return (
    <DemoPageRenderer
      title="Form Group"
      description="Form group is a container for form fields."
      pageIcon={<FontAwesomeIcon icon={faThList} size="2x" />}
      sourceId="form-group/form-group.tsx"
      editId="form-group"
      properties={[
        {
          default: 'false',
          description: 'Set to true to render the component in RTL mode.',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      callbacks={[
        {
          default: '',
          description:
            'Callback function that is called when the form is submitted.',
          name: 'onSubmit',
          optional: 'Yes',
          type: 'function',
        },
        {
          default: '',
          description:
            'Callback function that is called when the form is canceled.',
          name: 'onCancel',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default formGroup;
