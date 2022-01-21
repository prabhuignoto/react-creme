import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Tags } from '../../lib/components';
export {
  AutoComplete,
  Default,
  Disabled,
  ReadOnly,
} from '../../documentation/components/tags/widget-variants';

export default {
  component: Tags,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Tags',
} as ComponentMeta<typeof Tags>;
