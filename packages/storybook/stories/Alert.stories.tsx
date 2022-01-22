export {
  Custom,
  Dismiss,
  Error,
  Information,
  Success,
  Warning,
} from '../../documentation/components/alerts/widget-variants';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Alert } from '../../lib/components';

export default {
  component: Alert,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Alert',
} as ComponentMeta<typeof Alert>;
