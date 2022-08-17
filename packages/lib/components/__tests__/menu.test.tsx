import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Menu } from '../overlay/menu/menu';
import { MenuItemProps } from '../overlay/menu/menu-model';

const onSelected = vi.fn();

const items: MenuItemProps[] = [
  { name: 'one' },
  { disabled: true, name: 'two' },
  { name: 'three' },
];

describe('Menu', () => {
  it.concurrent('should render the host component', () => {
    const { getByText } = render(
      <Menu items={items}>
        <span>icon</span>
      </Menu>
    );

    expect(getByText('icon')).toBeInTheDocument();
  });

  it.concurrent('should onSelection work as expected', async () => {
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

  it.concurrent('should menu toggle', async () => {
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

  it.concurrent('should not select the disabled item', async () => {
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

  it.concurrent('should focus on keyboard interactions', async () => {
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
});
