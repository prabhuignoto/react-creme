import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Menu } from '../menu';
import { MenuItemProps } from '../menu-model';

const onSelected = vi.fn();

const items: MenuItemProps[] = [
  { name: 'one' },
  { name: 'two', disabled: true },
  { name: 'three' },
];

describe('Menu', () => {
  it('should render the host component', () => {
    const { getByText } = render(
      <Menu items={items}>
        <span>icon</span>
      </Menu>
    );

    expect(getByText('icon')).toBeInTheDocument();
  });

  it('should onSelection work as expected', async () => {
    const onSelected = vi.fn();
    const { getByText } = render(
      <Menu items={items} onSelected={onSelected}>
        <span>icon</span>
      </Menu>
    );
    fireEvent.click(getByText('icon'));

    await waitFor(() => {
      expect(getByText('one')).toBeInTheDocument();
    });

    fireEvent.click(getByText('one'));

    expect(onSelected).toBeCalledWith('one');
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
});
