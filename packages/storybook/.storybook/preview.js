import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '../../lib/components';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <ThemeProvider>
      <RecoilRoot>
        <div style={{ margin: '3em' }}>
          <Story />
        </div>
      </RecoilRoot>
    </ThemeProvider>
  ),
];
