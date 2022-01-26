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
      description="Tags are used to group and categorize content. They can be used to filter content, or to display additional information."
      pageIcon={<FontAwesomeIcon icon={faTags} size="2x" />}
      callbacks={[
        {
          default: ``,
          description: `callback fired on state change`,
          name: 'onChange',
          optional: 'Yes',
          type: `Function`,
        },
      ]}
      properties={[
        {
          default: `small`,
          description: `prop to set the size of the tag.<br> <em>small</em> | <em>large</em>`,
          name: 'tagSize',
          optional: 'Yes',
          type: `String`,
        },
        {
          default: `default`,
          description: `prop to set the style for the tag. <em>default</em> | <em>fill</em>`,
          name: 'tagStyle',
          optional: 'Yes',
          type: `String`,
        },
        {
          default: `[]`,
          description: `collection of tag items that will be rendered on load`,
          name: 'items',
          optional: 'Yes',
          type: `Array`,
        },
        {
          default: `Number.MAX_VALUE`,
          description: `prop to set the maximum number of tags allowed`,
          name: 'maxTags',
          optional: 'Yes',
          type: `Number`,
        },
        {
          default: 'False',
          description: `disables the button`,
          name: 'disabled',
          optional: 'Yes',
          type: `Boolean`,
        },
        {
          default: 'False',
          description: `prop to set the component to readonly state`,
          name: 'readonly',
          optional: 'Yes',
          type: `Boolean`,
        },
        {
          default: '50',
          description: `maximum width of the tag`,
          name: 'tagWidth',
          optional: 'Yes',
          type: `Number`,
        },
        {
          default: `{}`,
          description: `custom CSS that will be applied to the container of the component`,
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
