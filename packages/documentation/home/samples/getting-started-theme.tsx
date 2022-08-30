export default `import { Input, Theme, ThemeProvider } from 'react-creme';
import 'react-creme/dist/react-creme.css';

const AppTheme = {
  colors: {
    primary: '#0074B7',
    secondary: '#BFD7ED',
    tertiary: '#003B73',
    text: '#003B73',
    textSelection: '#003B73',
  },
  fontSizes: {
    lg: 18,
    md: 16,
    sm: 14,
  },
  iconSizes: {
    lg: 24,
    md: 20,
    sm: 16,
    xs: 12,
  },
  zIndexes: {
    dialog: 999999,
    drawer: 99999,
    globalNotification: 9999,
    menu: 999,
    notification: 9999,
  },
};

const App = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <main>
        <Input placeholder="Search" size="md" />
      </main>
    </ThemeProvider>
  );
};

export default App`;
