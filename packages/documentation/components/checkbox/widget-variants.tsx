import { CheckBox } from '@core';

export const Default = (
  <CheckBox
    label="Choose your preferred option"
    onChange={ele => console.log(ele)}
  />
);

export const Disabled = (
  <CheckBox
    label="This option is disabled"
    onChange={ele => console.log(ele)}
    border={false}
    disabled
  />
);

export const Large = (
  <CheckBox
    label="Choose this option"
    onChange={ele => console.log(ele)}
    isChecked
    size="lg"
    border={false}
    focusable
  />
);

export const CustomStyle = (
  <CheckBox
    onChange={ele => console.log(ele)}
    label="Choose this option"
    checkBoxStyle="round"
    isChecked
  />
);

export const Medium = (
  <CheckBox
    label="Choose this option"
    isChecked
    size="md"
    border={false}
    focusable
    checkBoxStyle="round"
  />
);

export const LargeRounded = (
  <CheckBox
    label="Choose this option"
    isChecked
    size="lg"
    border={false}
    focusable
    checkBoxStyle="round"
  />
);
