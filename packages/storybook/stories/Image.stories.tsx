import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  Expand,
} from '../../documentation/components/image/widget-variants';
import { Image } from '../../lib/components';

export default {
  component: Image,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '650px', margin: '0 auto', width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Image',
} as ComponentMeta<typeof Image>;

export const DefaultImage = () => <>{Default}</>;
export const ExpandImage = () => <>{Expand}</>;
