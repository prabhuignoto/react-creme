import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  AutoComplete,
  Default,
  Disabled,
  ReadOnly,
} from '../../documentation/components/tags/widget-variants';
import { Tags } from '../../lib/components';

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

export const AutoCompleteTags = () => <>{AutoComplete}</>;
export const DefaultTags = () => <>{Default}</>;
export const DisabledTags = () => <>{Disabled}</>;
export const ReadOnlyTags = () => <>{ReadOnly}</>;
