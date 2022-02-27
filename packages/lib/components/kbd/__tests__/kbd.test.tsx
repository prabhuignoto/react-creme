import { render } from '@testing-library/react';
import React from 'react';
import { Kbd } from '../kbd';
import styles from '../kbd.module.scss';

describe('Keyboard', () => {
  it('should render kbd', () => {
    const { getByText } = render(<Kbd>Shift</Kbd>);

    expect(getByText('Shift')).toBeInTheDocument();
  });

  it('should render kbd with size', () => {
    const { getByText } = render(<Kbd size="lg">Shift</Kbd>);

    expect(getByText('Shift')).toHaveClass(styles.kbd_lg);
  });

  it('should render kbd with raised button', () => {
    const { getByText } = render(<Kbd buttonRaised="right">Shift</Kbd>);

    expect(getByText('Shift')).toHaveClass(styles.kbd_right_raised);
  });
});
