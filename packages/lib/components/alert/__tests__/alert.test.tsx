import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Alert } from '../alert';
import styles from '../alert.module.scss';

describe('Alert', () => {
  it('should render the alert', () => {
    const { getByText } = render(<Alert message="test" />);
    expect(getByText('test')).toBeInTheDocument();
  });

  it('should render success state correctly', () => {
    const { getByRole } = render(<Alert message="test" state="success" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveClass(styles.alert_success);
  });

  it('should render warning state correctly', () => {
    const { getByRole } = render(<Alert message="test" state="warning" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveClass(styles.alert_warning);
  });

  it('should render error state correctly', () => {
    const { getByRole } = render(<Alert message="test" state="error" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveClass(styles.alert_error);
  });

  it('should render info state correctly', () => {
    const { getByRole } = render(<Alert message="test" state="info" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveClass(styles.alert_info);
  });

  it('should call onDismiss', () => {
    const onDismiss = vi.fn();
    const { getByRole } = render(
      <Alert message="test" state="info" onDismiss={onDismiss} />
    );
    fireEvent.click(getByRole('button'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should render custom content', () => {
    const { getByText } = render(
      <Alert message="test" state="info">
        <span>custom content</span>
      </Alert>
    );
    expect(getByText('custom content')).toBeInTheDocument();
  });
});
