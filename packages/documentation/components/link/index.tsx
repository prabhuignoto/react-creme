import DemoPageRenderer from './../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A link UI component is a component in a user interface that allows the
      user to navigate to another location, either within the same application
      or to a different website.
    </p>
  </div>
);

function Link() {
  return (
    <DemoPageRenderer
      title="Link"
      description={Description}
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
      demoWidget={<Widgets />}
      sourceId="link/link.tsx"
      editId="link"
    ></DemoPageRenderer>
  );
}

export default Link;
