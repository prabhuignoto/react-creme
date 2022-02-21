import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, fn, it } from 'vitest';
import { FormField } from '../form-field';

describe('Form Field', () => {
  it('Should render the form field', () => {
    const { getByText, getByPlaceholderText } = render(
      <FormField label="Name" placeholder="please enter your name" />
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('please enter your name')).toBeInTheDocument();
  });

  it('should render icon', () => {
    const { getByTestId } = render(
      <FormField
        label="Name"
        placeholder="please enter your name"
        icon={<i data-testid="icon" />}
      />
    );

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should render RTL mode', () => {
    const { getByText, container } = render(
      <FormField label="Name" placeholder="please enter your name" RTL />
    );

    expect(getByText('Name')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass('rc-form-field-rtl');
  });

  it('should call on change handler', async () => {
    const onChange = fn();
    const { getByPlaceholderText } = render(
      <FormField
        label="Name"
        placeholder="please enter your name"
        onChange={onChange}
      />
    );

    fireEvent.change(getByPlaceholderText('please enter your name'), {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });
});
