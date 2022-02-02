import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import vi from 'vitest';
import { Drawer } from '../drawer';

describe('Drawer', () => {
  it('should render the drawer', () => {
    const { getByRole, getByText } = render(
      <Drawer width={400}>
        <span>content</span>
      </Drawer>
    );

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('dialog')).toHaveStyle('--min-width: 400px');
    expect(getByRole('dialog')).toHaveClass('visible', 'slide-left-enter');
    expect(getByText('content')).toBeInTheDocument();
  });

  it('should render the drawer from right', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="right">
        <span>content</span>
      </Drawer>
    );

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('dialog')).toHaveClass('visible', 'slide-right-enter');
  });

  it('should render the drawer from bottom', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="bottom">
        <span>content</span>
      </Drawer>
    );

    expect(getByRole('dialog')).toHaveClass('visible', 'slide-bottom-enter');
  });

  it('should render the drawer from top', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="top">
        <span>content</span>
      </Drawer>
    );

    expect(getByRole('dialog')).toHaveClass('visible', 'slide-top-enter');
  });

  it('should close the drawer', async () => {
    const { container, queryByRole, getByRole } = render(
      <Drawer>
        <span>content</span>
      </Drawer>
    );

    fireEvent.keyUp(getByRole('dialog'), {
      key: 'Escape',
      keyCode: 'Escape',
    });
    // await act(async () => {
    // });

    await waitFor(
      async () => {
        expect(queryByRole('dialog')).not.toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );
  });

  it('should close button has focus on load', async () => {
    const { getAllByRole } = render(
      <Drawer>
        <span>content</span>
      </Drawer>
    );

    await waitFor(() => {
      expect(getAllByRole('button')[0]).toHaveFocus();
    });
  });
});
