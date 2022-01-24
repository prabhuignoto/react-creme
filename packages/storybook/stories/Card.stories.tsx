import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  CustomImage,
  Default,
} from '../../documentation/components/card/widget-variants';
import { Card } from '../../lib/components';

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

export const CustomImageExample = () => <>{CustomImage}</>;
export const DefaultCard = () => <>{Default}</>;
