import React from 'react';
import DemoPageRenderer from './../../common/demo-page-renderer';
import Widgets from './widgets';

function Link() {
  return (
    <DemoPageRenderer
      title="Link"
      description="Link is a component that can be used to create a link."
      tabTitles={['examples', 'properties', 'stackblitz']}
      features={[
        'Custom sizes',
        'Support for custom icon',
        'Accent. default or button',
      ]}
      properties={[
        {
          default: '',
          description: 'The URL of the link.',
          name: 'href',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '',
          description: 'The icon to display.',
          name: 'icon',
          optional: 'Yes',
          type: 'ReactNode',
        },
        {
          default: 'link',
          description:
            'The accent style of the link. Can be <code>default</code> or <code>button</code>.',
          name: 'accent',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'true',
          description: 'Whether the link is focusable.',
          name: 'focusable',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'sm',
          description:
            'The size of the link. Can be <code>sm</code>, <code>md</code> or <code>lg</code>.',
          name: ' size',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      stackBlitzCodes={['red']}
      demoWidget={<Widgets />}
      sourceId="link/link.tsx"
      editId="link"
    ></DemoPageRenderer>
  );
}

export default Link;
