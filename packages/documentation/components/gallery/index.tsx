import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p className="rc-component-description">
      A gallery UI component is a type of interface element that is used to
      display a collection of images, videos, or other multimedia content in a
      grid or other layout. A gallery can be used to showcase a selection of
      products, artworks, or other items.
    </p>
    <p>
      Galleries are commonly used on websites and applications that need to
      present a large number of visual assets in an organized and visually
      appealing way.
    </p>
  </div>
);

function formGroup() {
  return (
    <DemoPageRenderer
      title="Gallery"
      description={Description}
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
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default formGroup;
