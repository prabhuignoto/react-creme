import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function carousel() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      stackBlitzCodes={['react-ts-kgea3r']}
      title="Carousel"
      description={`Carousels allow multiple pieces of content to occupy a single, coveted space.
      This may placate corporate infighting, but on large or small viewports, people often scroll past carousels.`}
      pageIcon={<FontAwesomeIcon icon={faFilm} size="2x" />}
      editId="carousel"
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
