import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Input } from '../../input/input';
import { FormField } from '../form-field';
import styles from '../form-field.module.scss';

describe('Form Field', () => {
  it('Should render the form field', async () => {
    const { getByText, getByPlaceholderText } = render(
      <FormField label="Name">
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('please enter your name')).toBeInTheDocument();
  });

  it('should render icon', async () => {
    const { getByTestId } = render(
      <FormField label="Name" icon={<i data-testid="icon" />}>
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should render RTL mode', async () => {
    const { getByText, container } = render(
      <FormField label="Name" RTL>
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass(styles.rtl);
  });

  it('should render custom size', async () => {
    const { getByText, container } = render(
      <FormField label="Name" size="sm">
        <Input id="name" placeholder="please enter your name" />
      </FormField>
    );

    expect(getByText('Name')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass(styles.sm);
  });
});
