import { render } from '@testing-library/react';
import { Kbd } from '../kbd';
import styles from '../kbd.module.scss';

describe('Keyboard', () => {
  it.concurrent('should render kbd', () => {
    const { getByText } = render(<Kbd>Shift</Kbd>);

    expect(getByText('Shift')).toBeInTheDocument();
  });

  it.concurrent('should render kbd with size', () => {
    const { getByText } = render(<Kbd size="lg">Shift</Kbd>);

    expect(getByText('Shift')).toHaveClass(styles.lg);
  });

  it.concurrent('should render kbd with raised button', () => {
    const { getByText } = render(<Kbd buttonRaised="right">Shift</Kbd>);

    expect(getByText('Shift')).toHaveClass(styles.right_raised);
  });
});
