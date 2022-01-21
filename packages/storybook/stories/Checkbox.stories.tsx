import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { CheckBox } from '../../lib/components';

export {
  CustomStyle,
  Default,
  Disabled,
  Large,
} from '../../documentation/components/checkbox/widget-variants';

export default {
  component: CheckBox,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'CheckBox',
} as ComponentMeta<typeof CheckBox>;
