import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Dialog } from '../dialog';

describe('Dialog', () => {
  it('should render the dialog', () => {
    const { getByRole, getByText } = render(<Dialog title="test title" />);

    expect(getByRole('dialog')).toBeInTheDocument();

    expect(getByText('test title')).toBeInTheDocument();
  });

  it('should render the dialog', () => {
    const { getByText } = render(
      <Dialog title="test title">
        <span>dialog content</span>
      </Dialog>
    );

    expect(getByText('dialog content')).toBeInTheDocument();
  });

  it('should close the dialog', async () => {
    const { getByText, queryByRole } = render(
      <Dialog title="test title">
        <span>dialog content</span>
      </Dialog>
    );

    expect(queryByRole('dialog')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByText('cancel'));
    });

    await waitFor(
      async () => {
        expect(queryByRole('dialog')).not.toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });
});
