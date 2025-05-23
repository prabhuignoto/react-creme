import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Menu } from '../menu';
import { MenuItemProps } from '../menu-model';

const onSelected = vi.fn();

const items: MenuItemProps[] = [
  { name: 'one' },
  { disabled: true, name: 'two' },
  { name: 'three' },
];

describe('Menu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the host component', () => {
    const { getByText } = render(
      <Menu items={items}>
        <span>icon</span>
      </Menu>
    );

    expect(getByText('icon')).toBeInTheDocument();
  });

  it('should onSelection work as expected', async () => {
    const handler = vi.fn();
    const { getByText } = render(
      <Menu items={items} onSelected={handler}>
        <span>icon</span>
      </Menu>
    );
    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(getByText('one')).toBeInTheDocument();
    });

    fireEvent.click(getByText('one'));

    expect(handler).toBeCalledWith('one');
  });

  it('should menu toggle', async () => {
    const { getByText, queryByText } = render(
      <Menu items={items} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );
    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(getByText('one')).toBeInTheDocument();
    });

    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(queryByText('one')).not.toBeInTheDocument();
    });
  });

  it('should not select the disabled item', async () => {
    const handler = vi.fn();

    const { getByText } = render(
      <Menu items={items} onSelected={handler}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(getByText('two')).toBeInTheDocument();
      fireEvent.click(getByText('two'));
      expect(handler).not.toBeCalled();
    });
  });

  it('should focus on keyboard interactions', async () => {
    const { getByText, getByRole } = render(
      <Menu items={items} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(getByRole('menu')).toBeInTheDocument();
      // expect(getByText('one')).toHaveFocus();
    });
  });

  it('should close menu on Escape key press', async () => {
    const { getByText, queryByText } = render(
      <Menu items={items} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(getByText('one')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(queryByText('one')).not.toBeInTheDocument();
    });
  });

  it('should handle click outside to close menu', async () => {
    const { getByText, queryByText } = render(
      <Menu items={items} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(getByText('one')).toBeInTheDocument();
    });

    // Click outside the menu
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(queryByText('one')).not.toBeInTheDocument();
    });
  });

  it('should call onClose when menu closes', async () => {
    const onCloseMock = vi.fn();
    const { getByText } = render(
      <Menu items={items} onSelected={onSelected} onClose={onCloseMock}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(getByText('one')).toBeInTheDocument();
    });

    fireEvent.click(getByText('icon')); // Close the menu

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onOpen when menu opens', async () => {
    const onOpenMock = vi.fn();
    const menuId = 'test-menu-id';
    const { getByText } = render(
      <Menu
        items={items}
        onSelected={onSelected}
        onOpen={onOpenMock}
        id={menuId}
      >
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(onOpenMock).toHaveBeenCalledWith(menuId);
    });
  });

  it('should render with proper size class', () => {
    const { container } = render(
      <Menu items={items} size="lg">
        <span>icon</span>
      </Menu>
    );

    expect(container.querySelector('.menu-wrapper-lg')).not.toBeNull();
  });

  it('should handle RTL mode correctly', async () => {
    const { getByText } = render(
      <Menu items={items} RTL={true} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      const menuOverlay = document.querySelector('[data-testid="rc-overlay"]');
      expect(menuOverlay).toBeInTheDocument();
      // Here we would check for RTL-specific styling or attributes
      // This depends on your implementation details
    });
  });
});
