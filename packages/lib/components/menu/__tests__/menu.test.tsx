import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MenuContainer as Menu } from '../menu';
import { MenuItemProps } from '../menu-model';

const onSelected = jest.fn();

const items: MenuItemProps[] = [
  { name: 'one' },
  { name: 'two' },
  { name: 'three', disabled: true },
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
    const onSelected = jest.fn();
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
    const handler = jest.fn();

    const { getByText } = render(
      <Menu items={items} onSelected={handler}>
        <span>icon</span>
      </Menu>
    );

    fireEvent.click(getByText('icon'));

    await act(async () => {
      expect(getByText('three')).toBeInTheDocument();
      fireEvent.click(getByText('three'));
      expect(handler).not.toBeCalled();
    });
  });
});
