import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { GlobalNotification } from '../global-notification';

describe('GlobalNotification', () => {
  it('should render global notification', async () => {
    const { getByText } = render(
      <GlobalNotification message="Global Notification" />
    );

    await waitFor(() => {
      expect(getByText('Global Notification')).toBeInTheDocument();
    });
  });

  it('should render success state', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" state="success" />
    );
    await waitFor(() => {
      expect(getByRole('alertdialog')).toBeInTheDocument();
      expect(getByRole('alertdialog')).toHaveClass(
        'rc-global-notification-success'
      );
    });
  });

  it('should render error state', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" state="error" />
    );

    await waitFor(() => {
      expect(getByRole('alertdialog')).toBeInTheDocument();
      expect(getByRole('alertdialog')).toHaveClass(
        'rc-global-notification-error'
      );
    });
  });

  it('should render warning state', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" state="warning" />
    );

    await waitFor(() => {
      expect(getByRole('alertdialog')).toBeInTheDocument();
      expect(getByRole('alertdialog')).toHaveClass(
        'rc-global-notification-warning'
      );
    });
  });

  it('should render info state', async () => {
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" state="info" />
    );

    await waitFor(() => {
      expect(getByRole('alertdialog')).toBeInTheDocument();
      expect(getByRole('alertdialog')).toHaveClass(
        'rc-global-notification-info'
      );
    });
  });

  it('should call onClose on dismissed', async () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <GlobalNotification message="Global Notification" onClose={onClose} />
    );

    await waitFor(() => {
      expect(getByRole('alertdialog')).toBeInTheDocument();

      const closeButton = getByRole('button');
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });
  });
});
