import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  RTL,
} from '../../documentation/components/form-group/widget-variants';
import { FormGroup } from '../../lib/components';

export default {
  component: FormGroup,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '450px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'FormGroup',
} as ComponentMeta<typeof FormGroup>;

export const DefaultRender = () => <>{Default}</>;
export const RTLMode = () => <>{RTL}</>;
