import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function tags() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-hppcze']}
      title="Tags"
      description="Tags are used to group and categorize content. They can be used to filter content, or to display additional information.."
      pageIcon={<FontAwesomeIcon icon={faTags} size="2x" />}
      callbacks={[
        {
          default: ``,
          description: `Function executed on Change.`,
          name: 'onChange',
          optional: 'Yes',
          type: `Function`,
        },
      ]}
      properties={[
        {
          default: `small`,
          description: `Sets the size of the tag.<br> <em>sm</em> | <em>md</em> | <em>lg</em>.`,
          name: 'tagSize',
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
          description: `Collection of tag items that will be rendered on load.`,
          name: 'items',
          optional: 'Yes',
          type: `Array`,
        },
        {
          default: `Number.MAX_VALUE`,
          description: `Maximum tags allowed.`,
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
          description: `Sets the control to readonly.`,
          name: 'readonly',
          optional: 'Yes',
          type: `Boolean`,
        },
        {
          default: '50',
          description: `Maximum width of the tag.`,
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
      ]}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default tags;
