import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function carousel() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      stackBlitzCodes={['react-ts-kgea3r']}
      title="Carousel"
      description="Carousel is a component that displays a list of items in a carousel."
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
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
    ></DemoPageRenderer>
  );
}

export default carousel;
