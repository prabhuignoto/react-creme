import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  CustomIcon,
  Default,
  Expanded,
} from '../../documentation/components/accordion/widgets-variants';
import { Accordion } from '../../lib/components'; // YourComponent.stories.ts|tsx

export default {
  component: Accordion,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Accordion',
} as ComponentMeta<typeof Accordion>;

export const CustomIconExample = () => <>{CustomIcon}</>;
export const DefaultExample = () => <>{Default}</>;
export const ExpandedExample = () => <>{Expanded}</>;
