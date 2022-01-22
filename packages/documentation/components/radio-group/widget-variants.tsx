import React from 'react';
import { RadioGroup } from '../../../lib/components';

export const Default = () => (
  <RadioGroup
    items={[
      { disabled: false, label: 'John' },
      { label: 'Doe' },
      { label: 'Murthy' },
      { checked: true, label: 'Prabhu' },
    ]}
    onSelected={(val) => console.log(val)}
    focusable
  />
);

export const CustomLayout = () => (
  <RadioGroup
    layout="row"
    items={[
      { disabled: false, label: 'John' },
      { label: 'Doe' },
      { checked: true, label: 'Prabhu' },
    ]}
    onSelected={(val) => console.log(val)}
  />
);

export const Disabled = () => (
  <RadioGroup
    items={[
      { disabled: true, label: 'John' },
      { label: 'Doe' },
      { checked: true, label: 'Prabhu' },
    ]}
    onSelected={(val) => console.log(val)}
  />
);

export const RTL = () => (
  <RadioGroup
    RTL
    items={[
      { disabled: true, label: 'John' },
      { label: 'Doe' },
      { checked: true, label: 'Prabhu' },
    ]}
    onSelected={(val) => console.log(val)}
  />
);
