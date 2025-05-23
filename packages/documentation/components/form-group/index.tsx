import { faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A form group is a UI component that is used to group related form
      elements, such as checkboxes, radio buttons, or input fields, together.
      Form groups can be used to structure and organize forms, making them
      easier for users to fill out.
    </p>
    <p>
      Form groups are typically used in conjunction with labels and form
      controls, which are used to provide context and instructions for the form
      elements within the group. Form groups can be styled using CSS to match
      the overall design of a website or application.
    </p>
  </div>
);

function formGroup() {
  return (
    <DemoPageRenderer
      title="Form Group"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faThList} size="2x" />}
      sourceId="form-group/form-group.tsx"
      editId="form-group"
      features={['RTL Support']}
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
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default formGroup;
