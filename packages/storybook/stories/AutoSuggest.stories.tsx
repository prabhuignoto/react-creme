export { Default } from '../../documentation/components/auto-suggest/widget-variants';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { AutoSuggest } from '../../lib/components';

export default {
  component: AutoSuggest,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'AutoSuggest',
} as ComponentMeta<typeof AutoSuggest>;
