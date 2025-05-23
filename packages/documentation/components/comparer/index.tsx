import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p className="rc-component-description">
      An image comparer UI component is a user interface element that allows
      users to compare two images side by side. It typically includes a visual
      display of the two images, as well as controls for adjusting the size and
      position of each image in the comparison. This type of component is often
      used in applications such as photo editing software or document comparison
      tools.
    </p>
  </div>
);

function comparer() {
  return (
    <DemoPageRenderer
      title="Image Comparer"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faImages} size="2x" />}
      editId="comparer"
      features={['Horizontal or Vertical layout']}
      sourceId="image-comparer/image-comparer.tsx"
      properties={[
        {
          defaultValue: 'horizontal',
          description: 'The direction of the comparer',
          name: 'direction',
          optional: 'Yes',
          type: 'string',
        },
        {
          defaultValue: '',
          description: 'Source of the first image. Should be a valid URL.',
          name: 'sourceOne',
          optional: 'Yes',
          type: 'string',
        },
        {
          defaultValue: '',
          description: 'Source of the second image. Should be a valid URL.',
          name: 'sourceTwo',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default comparer;
