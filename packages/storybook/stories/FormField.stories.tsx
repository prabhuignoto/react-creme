import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  DropdownField,
  Icon,
  RTL,
  State,
} from '../../documentation/components/form-field/widget-variants';
import { FormField } from '../../lib/components';

export default {
  component: FormField,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '450px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'FormField',
} as ComponentMeta<typeof FormField>;

export const DefaultField = () => <>{Default}</>;
export const FieldWithDropdown = () => <>{DropdownField}</>;
export const FieldWithIcon = () => <>{Icon}</>;
export const FieldRTL = () => <>{RTL}</>;
export const StatefulField = () => <>{State}</>;
