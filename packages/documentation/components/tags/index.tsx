import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function tags() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-hppcze']}
      title="Tags"
      description="Tags are used to group and categorize content. They can be used to filter content, or to display additional information.."
      pageIcon={<FontAwesomeIcon icon={faTags} size="2x" />}
      sourceId="tags/tags.tsx"
      editId="tags"
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
