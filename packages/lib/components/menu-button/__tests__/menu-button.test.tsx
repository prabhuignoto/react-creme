import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MenuButton } from '../menu-button';

describe('Menu Button', () => {
  it('should render the Menu button', () => {
    const { getByText } = render(
      <MenuButton items={['save', 'cancel', 'delete']} width={150} />
    );

    expect(getByText(/^save$/i)).toBeInTheDocument();
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

    // await act(async () => {
    fireEvent.click(getByRole('img'));
    // });

    await waitFor(
      () => {
        expect(getByTestId('rc-overlay')).toBeInTheDocument();
        expect(getByText(/^save$/i)).toBeInTheDocument();
        expect(getByText(/^cancel$/i)).toBeInTheDocument();
        expect(getByText(/^delete$/i)).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );

    // await act(async () => {
    fireEvent.click(getByText('cancel'));
    // });

    // await waitFor(async () => {
    expect(handler).toBeCalledWith('cancel');
    // });
  });

  it('should call handler on click', async () => {
    const handler = vi.fn();
    const { getByText } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
      />
    );

    expect(getByText('save')).toBeInTheDocument();

    fireEvent.click(getByText('save'));

    await waitFor(() => {
      expect(handler).toBeCalledWith('save');
    });
  });

  it('should call handler from menu', async () => {
    const handler = vi.fn();
    const { getByText, getByRole } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
      />
    );

    fireEvent.click(getByRole('img'));

    await waitFor(() => {
      expect(getByRole('menu')).toBeInTheDocument();
      expect(getByText('cancel')).toBeInTheDocument();
    });

    fireEvent.click(getByText('cancel'));

    await waitFor(() => {
      expect(handler).toBeCalledWith('cancel');
    });
  });
});
