import React from 'react';
import { CheckBox } from '../../../lib/components';

export const Default = () => (
  <CheckBox
    label="Choose your preferred option"
    onChange={(ele) => console.log(ele)}
    focusIcon
  />
);

export const Disabled = () => (
  <CheckBox
    label="This option is disabled"
    onChange={(ele) => console.log(ele)}
    border={false}
    disabled
  />
);

export const Large = () => (
  <CheckBox
    label="Choose this option"
    onChange={(ele) => console.log(ele)}
    isChecked
    size="lg"
    border={false}
    focusable
  />
);

export const CustomStyle = () => (
  <CheckBox
    onChange={(ele) => console.log(ele)}
    label="Choose this option"
    focusIcon
    checkBoxStyle="round"
    isChecked
  />
);
