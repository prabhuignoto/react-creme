import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { it, vi } from 'vitest';
import { Dialog } from '../dialog';

describe('Dialog', () => {
  it('should render the dialog', () => {
    const { getByRole, getByText } = render(<Dialog title="test title" />);

    expect(getByRole('dialog')).toBeInTheDocument();

    expect(getByText('test title')).toBeInTheDocument();
  });

  it('should close the dialog', async () => {
    const { getByText, queryByRole } = render(
      <Dialog title="test title">
        <span>dialog content</span>
      </Dialog>
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
      </Dialog>
    );

    await waitFor(async () => {
      expect(queryByRole('dialog')).toBeInTheDocument();
      expect(onOpen).toHaveBeenCalled();
    });
  });

  it('should render children', () => {
    const { getByText } = render(
      <Dialog title="test title">
        <span>dialog content</span>
      </Dialog>
    );

    expect(getByText('dialog content')).toBeInTheDocument();
  });

  it("should render dialog with animation type 'rise'", async () => {
    const { getByRole } = render(
      <Dialog title="test title" animationType="rise">
        <span>dialog content</span>
      </Dialog>
    );
    await waitFor(() => {
      expect(getByRole('dialog')).toHaveStyle('--rc-dialog-animation:rise');
    });
  });

  it('should render dialog with custom animation duration', () => {
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
