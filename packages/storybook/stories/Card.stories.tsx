import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Card } from '../../lib/components';
export {
  CustomImage,
  Default,
} from '../../documentation/components/card/widget-variants';

export default {
  component: Card,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Card',
} as ComponentMeta<typeof Card>;
