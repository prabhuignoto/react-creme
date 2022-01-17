import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function slider() {
  return (
    <DemoPageRenderer
      callbacks={[
        {
          default: '',
          description: 'The function to call when the slider value changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: '1',
          description: 'The starting value of the slider.',
          name: 'start',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '10',
          description: 'The ending value of the slider.',
          name: 'end',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '0',
          description: 'The current value of the slider.',
          name: 'sliderValue',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'top',
          description: 'The position of the tooltip.',
          name: 'position',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Disables the tooltip.',
          name: 'disableTooltip',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Shows the tooltip only on hover.',
          name: 'showTooltipOnHover',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Shows the check icon.',
          name: 'showCheckIcon',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: '<code>40</code>',
          description: 'The width of the tooltip.',
          name: 'tooltipWidth',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '16px',
          description: 'The size of the knob.',
          name: 'knobSize',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'circle',
          description:
            'The shape of the knob. can be <code>circle</code> or <code>square</code>',
          name: 'knobShape',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Disables the slider.',
          name: 'disabled',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      stackBlitzCodes={['react-ts-acenzu']}
      demoWidget={lazy(() => import('./widgets'))}
      title="Slider"
      description="Slider is a component that allows you to select a value from a range of values."
    ></DemoPageRenderer>
  );
}

export default slider;
