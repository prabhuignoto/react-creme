import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Dropdown } from '../dropdown';

const options = [
  { name: 'usa', value: 'usa' },
  { name: 'uk', value: 'uk' },
  { name: 'germany', value: 'germany' },
  { name: 'india', value: 'india', selected: false },
  { name: 'sri lanka', value: 'sri lanka', selected: false },
];

const optionsSelected = [
  { name: 'usa', value: 'usa' },
  { name: 'uk', value: 'uk' },
  { name: 'germany', value: 'germany' },
  { name: 'india', value: 'india', selected: true },
  { name: 'sri lanka', value: 'sri lanka', selected: true },
];

const onSelected = vi.fn();

describe('Dropdown', () => {
  it('should handler be called', async () => {
    const { getByTestId, getByText, getByRole, getAllByRole } = render(
      <Dropdown
        options={options}
        placeholder="select a option"
        onSelected={onSelected}
      />
    );

    expect(getByText('select a option')).toBeInTheDocument();

    fireEvent.click(getByText('select a option'));

    await waitFor(async () => {
      expect(getByTestId('rc-overlay')).toBeInTheDocument();
      expect(
        getByTestId('rc-overlay').querySelector('[role="listbox"]')
      ).toBeInTheDocument();

      expect(
        getByTestId('rc-overlay').querySelectorAll('[role="option"]')
      ).toHaveLength(5);

      expect(getByText('germany')).toBeInTheDocument();
    });

    fireEvent.click(
      getByTestId('rc-overlay').querySelectorAll('[role="option"]')[2]
    );

    await waitFor(() => {
      expect(onSelected).toHaveBeenCalled();
    });
  });

  it('should auto close menu', async () => {
    const handler = vi.fn();
    const { container, getByTestId, queryByTestId, getByText, queryByRole } =
      render(
        <Dropdown
          options={options}
          placeholder="select a option"
          onSelected={handler}
        />
      );

    expect(getByText('select a option')).toBeInTheDocument();

    fireEvent.click(getByText('select a option'));

    await waitFor(() => {
      expect(getByTestId('rc-overlay')).toBeInTheDocument();
      expect(
        getByTestId('rc-overlay').querySelector('[role="listbox"]')
      ).toBeInTheDocument();

      expect(
        getByTestId('rc-overlay').querySelectorAll('[role="option"]')
      ).toHaveLength(5);
    });

    fireEvent.keyUp(
      getByTestId('rc-overlay').querySelector('[role="listbox"]'),
      {
        key: 'Escape',
      }
    );

    await waitFor(() => {
      expect(queryByTestId('rc-overlay')).not.toBeInTheDocument();
    });
  });

  it('should render disabled', async () => {
    const optionsDisabled = [
      { name: 'usa', value: 'usa' },
      { name: 'uk', value: 'uk' },
      { name: 'germany', value: 'germany' },
      { name: 'india', value: 'india' },
      { name: 'sri lanka', value: 'sri lanka' },
    ];

    const { getByText, container } = render(
      <Dropdown
        options={optionsDisabled}
        allowMultiSelection
        placeholder="select a option"
        disabled
      />
    );

    await waitFor(() => {
      expect(getByText('select a option')).toBeInTheDocument();
    });
    expect(container?.firstChild).toHaveClass('rc-dropdown-disabled');
    expect(container?.firstChild?.firstChild).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    expect(container?.firstChild?.firstChild).toHaveAttribute('tabindex', '-1');
  });

  it('should render allowMultiSelection mode', async () => {
    const { getByText, getByTestId } = render(
      <Dropdown
        options={optionsSelected}
        placeholder="select a option"
        allowMultiSelection
      />
    );

    fireEvent.click(getByText('india'));

    await waitFor(() => {
      expect(getByTestId('rc-overlay')).toBeInTheDocument();
      expect(
        getByTestId('rc-overlay').querySelector('[role="listbox"]')
      ).toBeInTheDocument();

      expect(
        getByTestId('rc-overlay').querySelectorAll('[role="option"]')
      ).toHaveLength(5);
    });
  });

  it('should clear selection on pressing the clear button', async () => {
    const { container, getByText, getByRole, getAllByRole, getByTestId } =
      render(
        <Dropdown
          options={options}
          placeholder="select a option"
          allowMultiSelection={true}
        />
      );

    fireEvent.click(getByText('select a option'));

    await waitFor(() => {
      expect(getByTestId('rc-overlay')).toBeInTheDocument();
      expect(getByText('india')).toBeInTheDocument();
    });

    fireEvent.click(
      getByTestId('rc-overlay').querySelectorAll('[role="option"]')[1]
    );

    await waitFor(() => {
      expect(container.querySelectorAll('.rc-tag').length).toBe(1);
    });

    fireEvent.click(getByTestId('clear-icon'));

    await waitFor(() => {
      expect(container.querySelectorAll('.rc-tag').length).toBe(0);
    });
  });

  it('should first element have the focus', async () => {
    const { getByText, getByRole, getAllByRole } = render(
      <Dropdown
        options={options}
        placeholder="select a option"
        allowMultiSelection={true}
      />
    );

    fireEvent.click(getByText('select a option'));

    await waitFor(
      () => {
        expect(getByRole('listbox')).toBeInTheDocument();
        expect(getAllByRole('option')).toHaveLength(5);
        expect(getAllByRole('option')[0]).toHaveFocus();
      },
      { timeout: 2000 }
    );
  });

  it('should focus change on keyboard interaction', async () => {
    const { getByText, getByRole, getAllByRole } = render(
      <Dropdown
        options={options}
        placeholder="select a option"
        allowMultiSelection={true}
      />
    );

    expect(getByText('select a option')).toBeInTheDocument();

    fireEvent.click(getByText('select a option'));

    await waitFor(
      () => {
        expect(getByRole('listbox')).toBeInTheDocument();
        expect(getAllByRole('option')).toHaveLength(5);
        expect(getAllByRole('option')[0]).toHaveFocus();
      },
      { timeout: 2500 }
    );

    fireEvent.keyDown(getByRole('listbox'), {
      key: 'ArrowDown',
    });

    await waitFor(() => {
      // expect(getAllByRole('option')[1]).toHaveFocus();
    });

    fireEvent.keyDown(getByRole('listbox'), {
      key: 'ArrowUp',
    });

    await waitFor(() => {
      expect(getAllByRole('option')[0]).toHaveFocus();
    });
  });
});
