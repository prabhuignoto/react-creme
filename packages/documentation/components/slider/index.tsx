import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

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
      pageIcon={<FontAwesomeIcon icon={faSlidersH} size="2x" />}
      sourceId="slider/slider.tsx"
      editId="slider"
      properties={[
        {
          default: '1',
          description: 'Starting value of the slider.',
          name: 'start',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '10',
          description: 'Ending value of the slider.',
          name: 'end',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '0',
          description: 'Current value of the slider.',
          name: 'sliderValue',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'top',
          description:
            'Position of the tooltip. can be <code>top</code> or <code>bottom</code>.',
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
          description: 'Sets the width of the tooltip.',
          name: 'tooltipWidth',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '16px',
          description: 'Prop to set the size of the knob.',
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
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-acenzu']}
      demoWidget={<Widgets />}
      title="Slider"
      description="Slider is a control that allows users to select a specific value (or range of values).
      All too often users get the information of what the value is all about by reading the label on a slider.
      At the same time, it's possible to create a much better user experience by visualizing the data connected to the slider"
    ></DemoPageRenderer>
  );
}

export default slider;
