/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { FormField } from '../../form-field/form-field';
import { Input } from '../../input/input';
import { FormGroup } from '../form-group';

describe('Form Group', () => {
  it('should render form fields', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <FormGroup>
        <FormField label="Please enter the name">
          <Input id="name" placeholder="Name" enableClear />
        </FormField>
      </FormGroup>
    );

    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByLabelText('Please enter the name')).toBeInTheDocument();
  });

  it('should render buttons', () => {
    const { getByText } = render(
      <FormGroup>
        <FormField label="Please enter the name">
          <Input id="name" placeholder="Name" enableClear />
        </FormField>
      </FormGroup>
    );

    expect(getByText('Submit')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('should call onSubmit and onCancel', () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    const { getByText } = render(
      <FormGroup onSubmit={onSubmit} onCancel={onCancel}>
        <FormField label="Please enter the name">
          <Input id="name" placeholder="Name" enableClear />
        </FormField>
      </FormGroup>
    );

    fireEvent.click(getByText('Submit'));

    expect(onSubmit).toHaveBeenCalled();

    fireEvent.click(getByText('Cancel'));

    expect(onCancel).toHaveBeenCalled();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<FormField />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
