import { Provider as JotaiProvider } from 'jotai';
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
      <JotaiProvider>
        <div style={{ margin: '3em' }}>
          <Story />
        </div>
      </JotaiProvider>
    </ThemeProvider>
  ),
];
