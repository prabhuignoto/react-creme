import { render } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';
import { Input } from '../../input/input';
import { FormField } from '../form-field';

describe('Form Field', () => {
  it('Should render the form field', () => {
    const { getByText, getByPlaceholderText } = render(
      <FormField label="Name">
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('please enter your name')).toBeInTheDocument();
  });

  it('should render icon', () => {
    const { getByTestId } = render(
      <FormField label="Name" icon={<i data-testid="icon" />}>
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should render RTL mode', () => {
    const { getByText, container } = render(
      <FormField label="Name" RTL>
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass('rc-form-field-rtl');
  });

  it('should render custom size', () => {
    const { getByText, container } = render(
      <FormField label="Name" size="sm">
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass('rc-form-field-sm');
  });
});
