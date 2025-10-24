import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      An image UI component is a component in a user interface that displays an
      image. It is commonly used in web and mobile application development. The
      image can be static or dynamic, and it can be displayed in various sizes
      and aspect ratios.
    </p>
  </div>
);

function image() {
  return (
    <DemoPageRenderer
      title="Image"
      description={Description}
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-fujyxg']}
      pageIcon={<FontAwesomeIcon icon={faImage} size="2x" />}
      sourceId="image/image.tsx"
      editId="image"
      features={['Expandable Image', 'Loading indicator', 'Responsive']}
      callbacks={[
        {
          default: '',
          description: 'Callback executed on image load',
          name: 'onLoad',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: '',
          description: 'Source url of the image',
          name: 'src',
          optional: 'No',
          type: 'String',
        },
        {
          default: 'false',
          description:
            'expands the image to the best possible resolution on full screen',
          name: 'expandImageOnClick',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '',
          description: 'Alternative text for the image',
          name: 'alt',
          optional: 'No',
          type: 'String',
        },
        {
          default: '100%',
          description: 'Width of the image',
          name: 'width',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '100%',
          description: 'Height of the image',
          name: 'height',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'true',
          description: 'Shows a loader while the image is loading',
          name: 'showLoader',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description:
            'Size of the loading icon. can be <em>sm</em> | <em>md</em> | <em>lg</em>',
          name: 'loaderSize',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default image;
