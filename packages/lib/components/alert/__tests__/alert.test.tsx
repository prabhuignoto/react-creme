import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from '../alert';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
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

  it('should render sm size correctly', async () => {
    const { getByRole } = render(<Alert message="test" state="info" size="sm" />);

    expect(getByRole('alert')).toHaveClass(styles.alert_sm);
  });

  it('should render md size correctly', async () => {
    const { getByRole } = render(<Alert message="test" state="info" size="md" />);

    expect(getByRole('alert')).toHaveClass(styles.alert_md);
  });

  it('should render lg size correctly', async () => {
    const { getByRole } = render(<Alert message="test" state="info" size="lg" />);

    expect(getByRole('alert')).toHaveClass(styles.alert_lg);
  });

  it('should handle very long messages', async () => {
    const longMessage =
      'This is a very long alert message that should be displayed correctly without breaking the layout or causing any visual issues in the alert component. It should wrap properly and remain readable.';
    const { getByText } = render(<Alert message={longMessage} state="info" />);

    expect(getByText(longMessage)).toBeInTheDocument();
  });

  it('should handle HTML content in children', async () => {
    const { getByText, getByRole } = render(
      <Alert message="test" state="info">
        <div>
          <strong>Bold text</strong> and <em>italic text</em>
        </div>
      </Alert>
    );

    expect(getByText('Bold text')).toBeInTheDocument();
    expect(getByText('italic text')).toBeInTheDocument();
    expect(getByRole('alert')).toBeInTheDocument();
  });

  it('should respect focusable prop when false', async () => {
    const { getByRole } = render(
      <Alert message="test" state="info" focusable={false} />
    );

    const closeButton = getByRole('button');
    expect(closeButton).toHaveAttribute('tabIndex', '-1');
  });

  it('should have correct aria attributes', async () => {
    const { getByRole } = render(<Alert message="test" state="info" />);

    const alert = getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('should apply custom height', async () => {
    const { getByRole } = render(
      <Alert message="test" state="info" height={150} />
    );

    const alert = getByRole('alert');
    expect(alert).toHaveStyle({ '--height': '150px' });
  });

  it('should render with default height', async () => {
    const { getByRole } = render(<Alert message="test" state="info" />);

    const alert = getByRole('alert');
    expect(alert).toHaveStyle({ '--height': '100px' });
  });

  it('should have aria-labelledby pointing to content', async () => {
    const { getByRole } = render(<Alert message="test content" state="info" />);

    const alert = getByRole('alert');
    const labelledBy = alert.getAttribute('aria-labelledby');

    expect(labelledBy).toBeTruthy();
    expect(labelledBy).toMatch(/^alert-content-/);

    // Verify the content element has the matching ID
    const contentElement = document.getElementById(labelledBy as string);
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent('test content');
  });
});
