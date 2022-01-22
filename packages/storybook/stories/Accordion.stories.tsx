export {
  CustomIcon,
  Default,
  Expanded,
} from '../../documentation/components/accordion/widgets-variants';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
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
