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

  // 1. Test if the checkbox group can handle an empty array of options
  it('should handle empty options', () => {
    const { queryByRole } = render(<CheckBoxGroup options={[]} />);

    expect(queryByRole('group')).toBeInTheDocument();
    expect(queryByRole('checkbox')).toBeNull();
  });

  // 2. Test if the `onChange` handler is not called when a disabled checkbox is clicked
  it('should not call the handler if the checkbox is disabled', async () => {
    const handler = vi.fn();
    const { getAllByRole } = render(
      <CheckBoxGroup options={options} onChange={handler} />
    );

    fireEvent.click(getAllByRole('checkbox')[2]);

    await waitFor(() => {
      expect(handler).not.toBeCalled();
    });
  });

  // 3. Test if the `onChange` handler is called with the correct arguments
  it('should call the handler with the correct arguments', async () => {
    const handler = vi.fn();
    const { getAllByRole } = render(
      <CheckBoxGroup
        options={[
          {
            id: '1',
            isChecked: false,
            label: 'Option 1',
          },
          {
            id: '2',
            isChecked: true,
            label: 'Option 2',
          },
        ]}
        onChange={handler}
      />
    );

    fireEvent.click(getAllByRole('checkbox')[0]);

    await waitFor(() => {
      expect(handler).toBeCalledWith([
        {
          id: '1',
          isChecked: true,
          name: 'Option 1',
        },
        {
          id: '2',
          isChecked: true,
          name: 'Option 2',
        },
      ]);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<CheckBoxGroup />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
