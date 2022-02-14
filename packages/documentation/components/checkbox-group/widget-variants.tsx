import React from 'react';
import { CheckBoxGroup } from '../../../lib/components';

export const Default = (
  <CheckBoxGroup
    onChange={value => console.log(value)}
    options={[
      {
        label: 'Option 1',
      },
      {
        label: 'Option 2',
      },
      {
        label: 'Option 3',
      },
      {
        label: 'Option 4',
      },
    ]}
  />
);

export const PreSelected = (
  <CheckBoxGroup
    size="md"
    options={[
      {
        label: 'Option 1',
      },
      {
        label: 'Option 2',
      },
      {
        isChecked: true,
        label: 'This option is preselected',
      },
    ]}
  />
);

export const Disabled = (
  <CheckBoxGroup
    options={[
      {
        label: 'Option 1',
      },
      {
        disabled: true,
        label: 'This option is disabled',
      },
      {
        disabled: true,
        isChecked: true,
        label: 'This option is disabled but preselected',
      },
    ]}
  />
);

export const CustomStyle = (
  <CheckBoxGroup
    checkboxStyle="round"
    options={[
      {
        label: 'Option 1',
      },
      {
        label: 'Option 2',
      },
      {
        label: 'Option 3',
      },
      {
        label: 'Option 4',
      },
    ]}
  />
);

export const RTL = (
  <CheckBoxGroup
    RTL
    options={[
      {
        label: 'Option 1',
      },
      {
        label: 'Option 2',
      },
      {
        label: 'Option 3',
      },
      {
        label: 'Option 4',
      },
    ]}
  />
);
