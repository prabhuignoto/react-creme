import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi } from 'vitest';
import { GlobalNotification } from '../global-notification';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../global-notification.module.scss';

expect.extend(toHaveNoViolations);

describe('GlobalNotification', () => {
  it('should render global notification', async () => {
    const { getByText } = render(
      <GlobalNotification message="Global Notification" />,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getByText('Global Notification')).toBeInTheDocument();
    });
  });

  it('should render success state', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" state="success" />,
      {
        container: document.body,
      }
    );
    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.success);
    });
  });

  it('should render error state', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" state="error" />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.error);
    });
  });

  it('should render warning state', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" state="warning" />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.warning);
    });
  });

  it('should render info state', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" state="info" />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.info);
    });
  });

  it('should call onClose on dismissed', async () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <GlobalNotification
        message="Global Notification"
        onClose={onClose}
        state="info"
      />,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();

      const closeButton = getByRole('button');
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should handle keyboard interaction on close button', async () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <GlobalNotification
        message="Global Notification"
        onClose={onClose}
        state="info"
        closeAfter={10000} // Longer timeout for testing
      />,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
    });

    const closeButton = getByRole('button');

    // Test Enter key
    fireEvent.keyDown(closeButton, {
      charCode: 13,
      code: 'Enter',
      key: 'Enter',
      keyCode: 13,
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle space key on close button', async () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <GlobalNotification
        message="Global Notification"
        onClose={onClose}
        state="info"
        closeAfter={10000} // Longer timeout for testing
      />,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
    });

    const closeButton = getByRole('button');

    // Test Space key
    fireEvent.keyDown(closeButton, {
      charCode: 32,
      code: 'Space',
      key: ' ',
      keyCode: 32,
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('should render sm size correctly', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" size="sm" />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.sm);
    });
  });

  it('should render md size correctly', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" size="md" />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.md);
    });
  });

  it('should render lg size correctly', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" size="lg" />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.lg);
    });
  });

  it('should apply shrink animation style', async () => {
    const { getByRole } = render(
      <GlobalNotification
        message="Global Notification"
        hideAnimationStyle="shrink"
      />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.animation_shrink);
    });
  });

  it('should apply hide animation style', async () => {
    const { getByRole } = render(
      <GlobalNotification
        message="Global Notification"
        hideAnimationStyle="hide"
      />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByRole('alert')).toHaveClass(styles.animation_hide);
    });
  });

  it('should handle long messages correctly', async () => {
    const longMessage =
      'This is a very long notification message that should be displayed correctly without breaking the layout or causing any visual issues in the component.';
    const { getByText } = render(
      <GlobalNotification message={longMessage} />,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getByText(longMessage)).toBeInTheDocument();
    });
  });

  it('should apply custom aria label to close button', async () => {
    const { getByRole } = render(
      <GlobalNotification
        message="Global Notification"
        ariaLabelClose="dismiss notification"
      />,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      const closeButton = getByRole('button', { name: 'dismiss notification' });
      expect(closeButton).toBeInTheDocument();
    });
  });

  it('should respect custom height', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" height={100} />
    );

    await waitFor(() => {
      const alert = getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveStyle({ '--height': '100px' });
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <GlobalNotification message="Test notification" />,
        {
          container: document.body,
        }
      );

      await waitFor(async () => {
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    it('should have aria-live attribute', async () => {
      const { getByRole } = render(
        <GlobalNotification message="Global Notification" />
      );

      await waitFor(() => {
        const alert = getByRole('alert');
        expect(alert).toHaveAttribute('aria-live', 'polite');
      });
    });

    it('should have proper aria-label on close button', async () => {
      const { getByRole } = render(
        <GlobalNotification message="Global Notification" />,
        {
          container: document.body,
        }
      );

      await waitFor(() => {
        const closeButton = getByRole('button');
        expect(closeButton).toHaveAttribute('aria-label', 'close notification');
      });
    });
  });
});
