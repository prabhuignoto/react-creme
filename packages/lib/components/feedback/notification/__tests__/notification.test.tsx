import { fireEvent, render, waitFor } from '@testing-library/react';
import { Notification } from '../notification';

describe('Notification', () => {
  it.concurrent('should render the notification', async () => {
    const { getByRole, getByText } = render(
      <Notification width={400} position="top-left" title="test notification">
        <span>content</span>
      </Notification>
    );

    await waitFor(
      () => {
        expect(getByRole('alert')).toBeInTheDocument();
        expect(getByText('content')).toBeInTheDocument();
        expect(getByRole('alert')).toHaveStyle('--min-width: 400px');
      },
      {
        timeout: 1500,
      }
    );
  });

  it.concurrent('should close the notification', async () => {
    const { queryByRole } = render(
      <Notification position="bottom-left" title="test notification">
        <span>content</span>
      </Notification>,
      {
        container: document.body,
      }
    );

    fireEvent.keyUp(document.body, {
      key: 'Escape',
      keyCode: 'Escape',
    });

    await waitFor(
      async () => {
        expect(queryByRole('dialog')).not.toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );
  });
});
