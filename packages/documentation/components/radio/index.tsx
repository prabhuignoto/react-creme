import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function radio() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      callbacks={[
        {
          default: '',
          description: 'callback for when the radio is changed',
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'auto generated',
          description: 'unique id for the radio',
          name: 'id',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '',
          description: 'label for the radio',
          name: 'label',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '',
          description: 'value for the radio',
          name: 'value',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'whether the radio is checked',
          name: 'isChecked',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description: 'whether the radio is disabled',
          name: 'disabled',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: 'whether the radio is focusable',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description: 'size of the radio',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '',
          description: 'style object for the radio',
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
      ]}
      tabTitles={['examples', 'properties']}
    ></DemoPageRenderer>
  );
}

export default radio;
