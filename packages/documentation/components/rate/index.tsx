import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function rate() {
  return (
    <DemoPageRenderer
      title="Rate"
      description="Rate component allows users to rate an item. It can be used to rate a product, a service, or any other item."
      pageIcon={<FontAwesomeIcon icon={faStarHalfAlt} size="2x" />}
      sourceId="rate/rate.tsx"
      editId="rate"
      features={[
        'Custom sizes',
        'RTL Support',
        'Disabled state',
        'Supports custom icon and icon count',
      ]}
      callbacks={[
        {
          default: ``,
          description: `callback function that will be called when the rating changes`,
          name: 'onChange',
          optional: 'Yes',
          type: `Function`,
        },
      ]}
      properties={[
        {
          default: `⭐`,
          description: `custom icon that will be used for rendering`,
          name: 'icon',
          optional: 'Yes',
          type: `String`,
        },
        {
          default: `5`,
          description: `number of icons to render`,
          name: 'iconCount',
          optional: 'Yes',
          type: `Number`,
        },
        {
          default: 'False',
          description: `makes the component focusable via keyboard`,
          name: 'focusable',
          optional: 'Yes',
          type: `Boolean`,
        },
        {
          default: 'sm',
          description: `sets the size of the button.
          <br> <em>sm</em> | <em>md</em> | <em>lg</em>`,
          name: 'size',
          optional: 'Yes',
          type: `String`,
        },
        {
          default: '[]',
          description: `sets the custom rating values. <br> <em>["1", "2", "3", "4", "5"]</em>`,
          name: 'ratingValues',
          optional: 'Yes',
          type: `Array`,
        },
        {
          default: 'False',
          description: 'disables the component',
          name: 'disabled',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'sets the direction of the component',
          name: 'RTL',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-lqtbt6']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default rate;
