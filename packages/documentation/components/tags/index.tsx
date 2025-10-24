import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A tags UI component allows users to add and manage tags, which are short
      labels that categorize or describe content. It typically consists of a
      text input field, where users can type in new tags, and a list of existing
      tags that can be deleted. The purpose of the tags UI component is to
      provide a flexible and user-friendly way to organize and categorize
      content.
    </p>
  </div>
);

function tags() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-hppcze']}
      title="Tags"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faTags} size="2x" />}
      sourceId="tags/tags.tsx"
      editId="tags"
      features={[
        'Editable tags',
        'Readonly tags for display only purposes',
        'Custom sizes',
        'AutoComplete inputs',
        'Disabled state',
        'Custom outlook. filled or default',
        'Restrict the number of tags with maxTags',
        'Change the accent. flat or rounded',
      ]}
      callbacks={[
        {
          default: ``,
          description: `Callback executed on change.`,
          name: 'onChange',
          optional: 'Yes',
          type: `Function`,
        },
      ]}
      properties={[
        {
          default: `sm`,
          description: `Sets the size of the tag.<br> Can be <em>sm</em> | <em>md</em> | <em>lg</em>.`,
          name: 'size',
          optional: 'Yes',
          type: `String`,
        },
        {
          default: `default`,
          description: `Sets the style for the tag. <em>default</em> | <em>fill</em>.`,
          name: 'tagStyle',
          optional: 'Yes',
          type: `String`,
        },
        {
          default: `[]`,
          description: `Collection of tag items that will be rendered.`,
          name: 'items',
          optional: 'No',
          type: `Array`,
        },
        {
          default: `Number.MAX_VALUE`,
          description: `Maximum tags that can be created or displayed.`,
          name: 'maxTags',
          optional: 'Yes',
          type: `Number`,
        },
        {
          default: 'False',
          description: `Disables the control.`,
          name: 'disabled',
          optional: 'Yes',
          type: `Boolean`,
        },
        {
          default: 'False',
          description: `Sets the control to be Readonly.`,
          name: 'readonly',
          optional: 'Yes',
          type: `Boolean`,
        },
        {
          default: '50',
          description: `Maximum width of the tag. Longer texts will be auto-truncated.`,
          name: 'tagWidth',
          optional: 'Yes',
          type: `Number`,
        },
        {
          default: `{}`,
          description: `Custom CSS that will be applied to the container.`,
          name: 'style',
          optional: 'Yes',
          type: `Object`,
        },
        {
          default: 'true',
          description: 'Sets the control to be focusable.',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tags;
