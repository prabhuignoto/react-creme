import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { MenuButton } from '../menu-button';

describe('Menu Button', () => {
  it('should render the Menu button', () => {
    const { getByText } = render(
      <MenuButton items={['save', 'cancel', 'delete']} width={150} />
    );

    expect(getByText('save')).toBeInTheDocument();
  });

  it('should open menu on click', async () => {
    const handler = vi.fn();
    const { getByRole, getByText, getByTestId } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
      />
    );

    await act(async () => {
      fireEvent.click(getByRole('img'));
    });

    await waitFor(
      () => {
        expect(getByTestId('rc-overlay')).toBeInTheDocument();
        expect(getByText('save')).toBeInTheDocument();
        expect(getByText('cancel')).toBeInTheDocument();
        expect(getByText('delete')).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );

    await act(async () => {
      fireEvent.click(getByText('cancel'));
    });

    await waitFor(async () => {
      expect(handler).toBeCalledWith('cancel');
    });
  });
});
