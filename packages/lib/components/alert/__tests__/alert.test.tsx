import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi } from 'vitest';
import { Alert } from '../alert';
import styles from '../alert.module.scss';

expect.extend(toHaveNoViolations);

describe('Alert', () => {
  it('should render the alert', async () => {
    const { getByText } = render(<Alert message="test" />);
    expect(getByText('test')).toBeInTheDocument();
  });

  it('should render success state correctly', async () => {
    const { getByRole } = render(<Alert message="test" state="success" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveClass(styles.alert_success);
  });

  it('should render warning state correctly', async () => {
    const { getByRole } = render(<Alert message="test" state="warning" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveClass(styles.alert_warning);
  });

  it('should render error state correctly', async () => {
    const { getByRole } = render(<Alert message="test" state="error" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveClass(styles.alert_error);
  });

  it('should render info state correctly', async () => {
    const { getByRole } = render(<Alert message="test" state="info" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveClass(styles.alert_info);
  });

  it('should call onDismiss', async () => {
    const onDismiss = vi.fn();
    const { getByRole } = render(
      <Alert message="test" state="info" onDismiss={onDismiss} />
    );
    fireEvent.click(getByRole('button'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should render custom content', async () => {
    const { getByText } = render(
      <Alert message="test" state="info">
        <span>custom content</span>
      </Alert>
    );
    expect(getByText('custom content')).toBeInTheDocument();
  });

  it('should not be any axe violations', async () => {
    const { container } = render(<Alert message="test" state="info" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle keyboard interaction on close button', async () => {
    const onDismiss = vi.fn();
    const { getByRole } = render(
      <Alert message="test" state="info" onDismiss={onDismiss} />
    );

    const closeButton = getByRole('button');

    // Test Enter key
    fireEvent.keyDown(closeButton, { key: 'Enter' });
    expect(onDismiss).toHaveBeenCalledTimes(1);

    // Test Space key
    fireEvent.keyDown(closeButton, { key: ' ' });
    expect(onDismiss).toHaveBeenCalledTimes(2);
  });

  it('should not render close button when canDismiss is false', async () => {
    const { queryByRole } = render(
      <Alert message="test" state="info" canDismiss={false} />
    );

    expect(queryByRole('button')).not.toBeInTheDocument();
  });

  it('should apply correct animation class', async () => {
    const { getByRole } = render(
      <Alert message="test" state="info" animation="fade" />
    );

    expect(getByRole('alert')).toHaveClass(styles.fade);
    expect(getByRole('alert')).not.toHaveClass(styles.shrink);
  });

  it('should respect RTL prop', async () => {
    const { getByRole } = render(
      <Alert message="test" state="info" RTL={true} />
    );

    expect(getByRole('alert')).toHaveClass(styles.alert_rtl);
  });
});
