import type { Meta } from '@storybook/react';
import React from 'react';
import {
  Default,
  ImageOnly,
  WithMaxSize,
  WithMaxFiles,
  Small,
  Medium,
  Large,
  Disabled,
  NoThumbnails,
  NoProgress,
  CustomContent,
  RTL,
} from '../../documentation/components/file-upload/widget-variants';
import { FileUpload } from '../../lib/components';

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', maxWidth: '600px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  title: 'FileUpload',
  tags: ['autodocs'],
};

export default meta;

export const DefaultRender = () => <>{Default}</>;
export const ImageOnlyUpload = () => <>{ImageOnly}</>;
export const WithMaxSizeLimit = () => <>{WithMaxSize}</>;
export const WithMaxFilesLimit = () => <>{WithMaxFiles}</>;
export const SmallSize = () => <>{Small}</>;
export const MediumSize = () => <>{Medium}</>;
export const LargeSize = () => <>{Large}</>;
export const DisabledState = () => <>{Disabled}</>;
export const WithoutThumbnails = () => <>{NoThumbnails}</>;
export const WithoutProgress = () => <>{NoProgress}</>;
export const CustomDropZone = () => <>{CustomContent}</>;
export const RightToLeft = () => <>{RTL}</>;
