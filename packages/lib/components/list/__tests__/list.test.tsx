import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import { List } from '../list';

const handler = vi.fn();

const options = [
  { name: 'brazil', value: 'brazil', id: 'brazil' },
  { name: 'usa', value: 'usa', id: 'usa' },
  { name: 'uk', value: 'uk', id: 'uk' },
  { name: 'germany', value: 'germany', id: 'germany' },
  { name: 'india', value: 'india', id: 'india' },
];

describe('List', () => {
  it('should render list', () => {
    const { getByRole } = render(<List options={options} />);

    expect(getByRole('listbox')).toBeInTheDocument();
    expect(getByRole('listbox').querySelectorAll('li')).toHaveLength(5);
  });

  it('should call handler', async () => {
    const { getByRole } = render(
      <List options={options} onSelection={handler} />
    );
    const target = getByRole('listbox').querySelectorAll('li')[0]
      .firstChild as HTMLElement;

    if (target) {
      userEvent.click(target);

      await waitFor(async () => {
        expect(handler).toBeCalled();
      });
    }
  });

  it('should handle search', async () => {
    const { container, getByRole } = render(<List options={options} />);

    const input = container.querySelector(".rc-input input[type='text'");

    if (input) {
      expect(input).toBeInTheDocument();

      fireEvent.change(input, {
        target: {
          value: 'usa',
        },
      });

      await waitFor(
        async () => {
          expect(getByRole('listbox').querySelectorAll('li')).toHaveLength(1);
        },
        {
          timeout: 500,
        }
      );

      fireEvent.change(input, {
        target: {
          value: '',
        },
      });

      await waitFor(
        async () => {
          expect(getByRole('listbox').querySelectorAll('li')).toHaveLength(6);
        },
        {
          timeout: 500,
        }
      );
    }
  });

  it('should render multi selection', async () => {
    const { getByRole, getAllByRole } = render(
      <List options={options} allowMultiSelection onSelection={handler} />
    );

    expect(getByRole('listbox')).toBeInTheDocument();
    expect(getAllByRole('option')).toHaveLength(5);

    fireEvent.click(getAllByRole('option')[0]);
    expect(handler).toBeCalled();
  });

  it('should list items get focus on keyboard interaction', async () => {
    const handler = vi.fn();

    const { getByRole, getAllByRole } = render(
      <List options={options} onSelection={handler} />
    );

    expect(getByRole('listbox')).toBeInTheDocument();

    fireEvent.click(getAllByRole('option')[0]);

    await waitFor(() => {
      expect(getAllByRole('option')[0]).toHaveFocus();
    });

    fireEvent.keyUp(getByRole('listbox'), {
      key: 'ArrowDown',
    });

    await waitFor(() => {
      expect(getAllByRole('option')[0]).toHaveFocus();
    });

    fireEvent.keyUp(getByRole('listbox'), {
      key: 'ArrowUp',
    });

    await waitFor(() => {
      expect(getAllByRole('option')[0]).toHaveFocus();
    });

    fireEvent.keyPress(getAllByRole('option')[0], {
      key: 'Enter',
    });

    await waitFor(() => {
      expect(handler).toBeCalled();
    });
  });

  it('should handle selection for single selection mode', async () => {
    const handler = vi.fn();
    const { getByRole, getAllByRole } = render(
      <List options={options} onSelection={handler} noUniqueIds />
    );

    expect(getByRole('listbox')).toBeInTheDocument();
    expect(getAllByRole('option')).toHaveLength(5);

    fireEvent.click(getAllByRole('option')[0]);

    await waitFor(() => {
      expect(handler).toBeCalledWith([
        {
          id: 'brazil',
          name: 'brazil',
          value: 'brazil',
        },
      ]);
    });
  });

  it('should handle selection for multi selection mode', async () => {
    const handler = vi.fn();
    const { getByRole, getAllByRole } = render(
      <List
        options={options}
        allowMultiSelection={true}
        onSelection={handler}
        noUniqueIds
      />
    );

    expect(getByRole('listbox')).toBeInTheDocument();
    expect(getAllByRole('option')).toHaveLength(5);

    fireEvent.click(getAllByRole('option')[0]);

    await waitFor(
      () => {
        expect(handler).toBeCalledWith([
          {
            id: 'brazil',
            name: 'brazil',
            value: 'brazil',
          },
        ]);
      },
      { timeout: 1000 }
    );
  });
});
