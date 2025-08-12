import type { StorybookConfig } from '@storybook/react-vite';

// Reuse the root configuration by extending it; local package files can override
const config: StorybookConfig = {
  stories: [
    '../documentation/components/**/*.stories.@(ts|tsx)',
    './stories/**/*.stories.@(ts|tsx)',
  ],
  refs: {},
};

export default config;
