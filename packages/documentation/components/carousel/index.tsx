import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';
const Description = (
  <div>
    <p className="rc-component-description">
      A carousel component is a type of user interface element that displays a
      series of items (such as images or text) in a rotating, looping fashion.
      It typically allows the user to navigate through the items by clicking or
      swiping on the screen.
    </p>
    <p>
      Carousel components are often used to highlight featured content or to
      showcase a series of related items in a visually appealing way. They are
      commonly found on websites and mobile apps.
    </p>
  </div>
);

function carousel() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      stackBlitzCodes={['react-ts-kgea3r']}
      title="Carousel"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faFilm} size="2x" />}
      editId="carousel"
      features={[
        'Vertical or Horizontal layout',
        'Custom Transitions',
        'Auto play',
      ]}
      sourceId="carousel/carousel.tsx"
      properties={[
        {
          default: 'horizontal',
          description: 'prop to set the navigation direction of the carousel',
          name: 'direction',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '400',
          description: 'sets the height of the carousel',
          name: 'height',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'cubic-bezier(0.55, 0.08, 0.68, 0.53',
          description: 'prop to set custom transition animation',
          name: 'transition',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '0',
          description: `auto plays the carousel on load. pass duration in ms for each item in the carousel`,
          name: 'autoPlay',
          optional: 'Yes',
          type: 'Number',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
    ></DemoPageRenderer>
  );
}

export default carousel;
