export {
  CheckIcon,
  Default,
  Disabled,
  ExtraLarge,
  LabelOutside,
  Large,
} from '../../documentation/components/switch/widget-variants';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Switch } from '../../lib/components';

export default {
  component: Switch,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '125px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Switch',
} as ComponentMeta<typeof Switch>;
