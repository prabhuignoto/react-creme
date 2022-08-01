import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { GlobalNotification } from '../global-notification';
import styles from '../global-notification.module.scss';

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

  it.concurrent('should render success state', async () => {
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

  it.concurrent('should render info state', async () => {
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
      <GlobalNotification message="Global Notification" onClose={onClose} />
    );

    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();

      const closeButton = getByRole('button');
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });
  });
});
