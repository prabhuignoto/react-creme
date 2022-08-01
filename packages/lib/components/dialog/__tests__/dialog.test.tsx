import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import { Dialog } from '../dialog';

describe('Dialog', () => {
  it.concurrent('should render the dialog', async () => {
    const { getByRole, getByText } = render(<Dialog title="test title" />);

    expect(getByRole('dialog')).toBeInTheDocument();

    expect(getByText('test title')).toBeInTheDocument();
  });

  it.concurrent('should close the dialog', async () => {
    const { getByText, queryByRole } = render(
      <Dialog title="test title">
        <span>dialog content</span>
      </Dialog>,
      {
        container: document.body,
      }
    );

    expect(queryByRole('dialog')).toBeInTheDocument();

    fireEvent.click(getByText('cancel'));

    await waitFor(
      async () => {
        expect(queryByRole('dialog')).not.toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });

  it('should call onOpen', async () => {
    const onOpen = vi.fn();
    const { queryByRole } = render(
      <Dialog title="test title" onOpen={onOpen}>
        <span>dialog content</span>
      </Dialog>,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(queryByRole('dialog')).toBeInTheDocument();
      expect(onOpen).toBeCalled();
    });
  });

  it('should render children', async () => {
    const { getByText } = render(
      <Dialog title="test title">
        <span>dialog content</span>
      </Dialog>
    );

    await waitFor(
      async () => {
        expect(getByText('dialog content')).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });

  it.concurrent("should render dialog with animation type 'rise'", async () => {
    const { getByRole } = render(
      <Dialog title="test title" animationType="rise">
        <span>dialog content</span>
      </Dialog>
    );
    await waitFor(() => {
      expect(getByRole('dialog')).toHaveStyle('--rc-dialog-animation:rise');
    });
  });

  it('should render dialog with custom animation duration', async () => {
    const { getByRole } = render(
      <Dialog title="test title" animationType="pop" animationDuration={400}>
        <span>dialog content</span>
      </Dialog>
    );
    expect(getByRole('dialog')).toHaveStyle('--rc-dialog-animation:pop');
  });

  it('should close button have the focus on load', async () => {
    const { getAllByRole } = render(
      <Dialog title="test title" focusable>
        <span>dialog content</span>
      </Dialog>
    );

    await waitFor(() => {
      expect(getAllByRole('button')[0]).toHaveFocus();
    });
  });
});
