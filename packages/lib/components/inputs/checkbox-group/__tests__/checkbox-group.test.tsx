import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { CheckBoxGroup } from '../checkbox-group';

const options = [
  {
    id: '1',
    label: 'Option 1',
  },
  {
    id: '2',
    isChecked: true,
    label: 'Option 2',
  },
  {
    disabled: true,
    id: '3',
    label: 'Option 3',
  },
];

describe('CheckboxGroup', () => {
  it.concurrent('should render checkbox group', () => {
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

  it.concurrent('should check for isChecked', () => {
    const { getAllByRole } = render(<CheckBoxGroup options={options} />);

    expect(getAllByRole('checkbox')[1]).toBeChecked();
  });

  it.concurrent('check for disabled option', () => {
    const { getAllByRole } = render(<CheckBoxGroup options={options} />);

    expect(getAllByRole('checkbox')[2]).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it.concurrent('should handle on change', async () => {
    const optionsData = [
      {
        id: '1',
        label: 'Option 1',
      },
      {
        id: '2',
        isChecked: true,
        label: 'Option 2',
      },
      {
        disabled: true,
        id: '3',
        label: 'Option 3',
      },
    ];
    const handler = vi.fn();
    const { getAllByRole } = render(
      <CheckBoxGroup options={optionsData} onChange={handler} />,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getAllByRole('checkbox')).toHaveLength(3);
    });

    // act(() => {
    fireEvent.click(getAllByRole('checkbox')[0]);
    // });

    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
    });
  });
});
