import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { MenuButton } from '../menu-button';

describe('Menu Button', () => {
  it('should render the Menu button', () => {
    const { getByText } = render(
      <MenuButton items={['save', 'cancel', 'delete']} width={150} />
    );

    expect(getByText('save')).toBeInTheDocument();
  });

  it('should open menu on click', async () => {
    const handler = jest.fn();
    const { getByRole, getByText } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
      />
    );

    await act(async () => {
      fireEvent.click(getByRole('img'));
    });

    await waitFor(async () => {
      expect(getByRole('menu')).toBeInTheDocument();
      expect(getByText('cancel')).toBeInTheDocument();
      expect(getByText('delete')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(getByText('cancel'));
      expect(handler).toBeCalledWith('cancel');
    });
  });
});
