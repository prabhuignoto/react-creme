import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { RadioGroup } from '../../lib/components';
export {
  CustomLayout,
  Default,
  Disabled,
  RTL,
} from '../../documentation/components/radio-group/widget-variants';

export default {
  component: RadioGroup,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'RadioGroup',
} as ComponentMeta<typeof RadioGroup>;
