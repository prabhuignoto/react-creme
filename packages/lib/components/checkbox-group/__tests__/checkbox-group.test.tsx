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
    const handleChange = vi.fn();
    const { getAllByRole } = render(
      <CheckBoxGroup options={options} onChange={handleChange} noUniqueIds />
    );

    await act(async () => {
      fireEvent.click(getAllByRole('checkbox')[1]);
    });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([
        {
          name: 'Option 1',
          id: '1',
          isChecked: false,
        },
        {
          name: 'Option 2',
          isChecked: false,
          id: '2',
        },
        {
          name: 'Option 3',
          isChecked: false,
          id: '3',
        },
      ]);
    });
  });
});
