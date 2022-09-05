import { render } from '@testing-library/react';
import { Text } from '../text';
import styles from '../text.module.scss';

describe('Text', () => {
  it.concurrent('should render Text', () => {
    const { getByText } = render(<Text>Text</Text>);
    expect(getByText('Text')).toBeInTheDocument();
  });

  it.concurrent('should render Text with RTL', () => {
    const { getByText } = render(<Text RTL>Text</Text>);
    expect(getByText('Text')).toHaveClass(styles.RTL);
  });
});
