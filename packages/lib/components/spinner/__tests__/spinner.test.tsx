import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Spinner } from '../../spinner/spinner';
import styles from '../spinner.module.scss';

describe('Spinner', () => {
  it('should render spinner', () => {
    const { getByRole } = render(<Spinner />);
    expect(getByRole('img')).toBeInTheDocument();
  });

  it('should render custom size', () => {
    const { getByRole } = render(<Spinner size="sm" />);
    expect(getByRole('img')).toHaveClass(styles.spinner_sm);
  });

  it('should be able to customize the speed', () => {
    const { getByRole } = render(<Spinner speed="fast" />);
    expect(getByRole('img')).toHaveStyle('--rc-spinner-speed: fast');
  });
});
