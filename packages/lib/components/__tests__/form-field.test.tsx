import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { FormField } from '../inputs/form-field/form-field';
import styles from '../inputs/form-field/form-field.module.scss';
import { Input } from '../inputs/input/input';

describe('Form Field', () => {
  it.concurrent('Should render the form field', async () => {
    const { getByText, getByPlaceholderText } = render(
      <FormField label="Name">
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('please enter your name')).toBeInTheDocument();
  });

  it.concurrent('should render icon', async () => {
    const { getByTestId } = render(
      <FormField label="Name" icon={<i data-testid="icon" />}>
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it.concurrent('should render RTL mode', async () => {
    const { getByText, container } = render(
      <FormField label="Name" RTL>
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass(styles.rtl);
  });

  it.concurrent('should render custom size', async () => {
    const { getByText, container } = render(
      <FormField label="Name" size="sm">
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass(styles.sm);
  });
});
