import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { CheckBoxGroup } from '../checkbox-group';

const options = [
  {
    label: 'Option 1',
    id: '1',
  },
  {
    label: 'Option 2',
    isChecked: true,
    id: '2',
  },
  {
    label: 'Option 3',
    disabled: true,
    id: '3',
  },
];

describe('CheckboxGroup', () => {
  it('should render checkbox group', () => {
    const { getByRole, getByText, getAllByRole } = render(
      <CheckBoxGroup options={options} />
    );

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();

    expect(getByRole('group')).toBeInTheDocument();

    expect(getAllByRole('checkbox')).toHaveLength(3);
  });

  it('should match snapshot', () => {
    const { container } = render(<CheckBoxGroup options={options} />);

    expect(container).toMatchSnapshot();
  });

  it('should check for isChecked', () => {
    const { getAllByRole } = render(<CheckBoxGroup options={options} />);

    expect(getAllByRole('checkbox')[1]).toBeChecked();
  });

  it('check for disabled option', () => {
    const { getAllByRole } = render(<CheckBoxGroup options={options} />);

    expect(getAllByRole('checkbox')[2]).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('should handle on change', async () => {
    const optionsData = [
      {
        label: 'Option 1',
        id: '1',
      },
      {
        label: 'Option 2',
        isChecked: true,
        id: '2',
      },
      {
        label: 'Option 3',
        disabled: true,
        id: '3',
      },
    ];
    const handler = vi.fn();
    const { getAllByRole } = render(
      <CheckBoxGroup options={optionsData} onChange={handler} />
    );

    await waitFor(() => {
      expect(getAllByRole('checkbox')).toHaveLength(3);
    });

    act(() => {
      fireEvent.click(getAllByRole('checkbox')[0]);
    });

    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
    });
  });
});
