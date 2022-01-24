import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  AutoClosingSections,
  CustomIcon,
  Default,
  InitialState,
} from '../../documentation/components/accordion-group/widget-variants';
import { AccordionGroup } from '../../lib/components';

export default {
  component: AccordionGroup,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Accordion Group',
} as ComponentMeta<typeof AccordionGroup>;

export const AutoClosing = () => <>{AutoClosingSections}</>;
export const CustomIconExample = () => <>{CustomIcon}</>;
export const InitialStateExample = () => <>{InitialState}</>;
export const DefaultExample = () => <>{Default}</>;
