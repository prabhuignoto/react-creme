import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi, describe, it, beforeEach } from 'vitest';
import { MenuButton } from '../menu-button';

describe('Menu Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the Menu button', () => {
    const { getByText } = render(
      <MenuButton items={['save', 'cancel', 'delete']} width={150} />
    );

    expect(getByText(/^save$/i)).toBeInTheDocument();
  });

  it('should open menu on click anywhere in the button', async () => {
    const handler = vi.fn();
    const { getByText, getByTestId, container } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
      />
    );

    // Click on the whole button container, not just the arrow
    fireEvent.click(container.firstChild as Element);

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

    fireEvent.click(getByText('cancel'));

    expect(handler).toBeCalledWith('cancel');
  });

  it('should call handler on click on primary action', async () => {
    const handler = vi.fn();
    const { getByText } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
      />
    );

    expect(getByText('save')).toBeInTheDocument();

    // Click directly on the primary button
    fireEvent.click(getByText('save'));

    await waitFor(() => {
      expect(handler).toBeCalledWith('save');
    });
  });

  it('should call handler from menu', async () => {
    const handler = vi.fn();
    const { getByText, container } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
      />
    );

    // Click on the whole button to open the menu
    fireEvent.click(container.firstChild as Element);

    await waitFor(() => {
      expect(getByText('cancel')).toBeInTheDocument();
    });

    fireEvent.click(getByText('cancel'));

    await waitFor(() => {
      expect(handler).toBeCalledWith('cancel');
    });
  });

  it('should respect disabled state', () => {
    const handler = vi.fn();
    const { container } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
        disabled={true}
      />
    );

    expect(container.firstChild).toHaveClass('disabled');

    // Attempt to click the disabled button
    fireEvent.click(container.firstChild as Element);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should support keyboard navigation with Enter key', async () => {
    const handler = vi.fn();
    const { getByText, container } = render(
      <MenuButton
        items={['save', 'cancel', 'delete']}
        width={150}
        onSelected={handler}
      />
    );

    // Use the container element with tabIndex for keyboard events
    const button = container.firstChild as HTMLElement;

    // Open menu with Enter key
    fireEvent.keyDown(button, { key: 'Enter' });

    await waitFor(() => {
      expect(getByText('cancel')).toBeInTheDocument();
    });

    // Select an item
    fireEvent.click(getByText('cancel'));

    expect(handler).toBeCalledWith('cancel');
  });

  it('should apply custom width', () => {
    const customWidth = 250;
    const { container } = render(
      <MenuButton items={['save', 'cancel', 'delete']} width={customWidth} />
    );

    const style = window.getComputedStyle(container.firstChild as Element);
    expect(style.getPropertyValue('--max-width')).toBe(`${customWidth}px`);
  });

  it('should apply RTL mode correctly', () => {
    const { container } = render(
      <MenuButton items={['save', 'cancel', 'delete']} RTL={true} />
    );

    expect(container.firstChild).toHaveClass('rtl');
  });

  it('should have appropriate accessibility attributes', () => {
    const { container } = render(
      <MenuButton items={['save', 'cancel', 'delete']} />
    );

    const button = container.firstChild as HTMLElement;
    expect(button).toHaveAttribute('role', 'button');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('tabIndex', '0');
  });
});
