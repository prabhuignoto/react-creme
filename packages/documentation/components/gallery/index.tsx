import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function formGroup() {
  return (
    <DemoPageRenderer
      title="Gallery"
      description="Gallery is a component that displays a collection of images in an organized grid."
      pageIcon={<FontAwesomeIcon icon={faImages} size="2x" />}
      sourceId="gallery/gallery.tsx"
      editId="gallery"
      features={[
        'Expandable Images',
        'Build gallery grid of any dimension',
        'Create gallery quickly with Image urls',
        'Adjust the image dimension as well as the gap between the images',
      ]}
      properties={[
        {
          default: '10',
          description: 'gap in pixels between the images',
          name: 'gap',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'false ',
          description: 'Expands the image on click',
          name: 'expandImageOnclick',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '[3, 3]',
          description: 'Gallery dimension in columns and rows',
          name: 'gridDimension',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: '100',
          description: 'Width and height of the image',
          name: 'imageDimension',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '[]',
          description: 'Array of images URL',
          name: 'imagesURL',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: '[]',
          description: 'Array of React node passed as children',
          name: 'children',
          optional: 'Yes',
          type: 'Array',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default formGroup;
