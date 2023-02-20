import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Password } from '../password';

describe('Password', () => {
  it('should render the password', () => {
    const { getByLabelText } = render(<Password />);
    expect(getByLabelText('Please enter the password...')).toBeInTheDocument();
  });

  it('should call the handler on change', async () => {
    const onChange = vi.fn();

    const { getByPlaceholderText } = render(
      <Password onChange={onChange} placeholder="enter password" />
    );

    const input = getByPlaceholderText('enter password');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('test');
    });
  });

  it('should change type on toggle', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Password placeholder="enter password" />
    );

    const input = getByPlaceholderText('enter password');

    expect(input).toHaveAttribute('type', 'password');

    const show = getByRole('button', {
      name: 'show password',
    });

    expect(show).toBeInTheDocument();

    fireEvent.click(show);

    expect(input).toHaveAttribute('type', 'text');

    // const hide = getByRole('button', {
    //   name: 'hide password',
    // });
  });

  it('should clear input', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <Password placeholder="enter password" />
    );

    const input = getByPlaceholderText('enter password');

    fireEvent.change(input, { target: { value: 'test' } });

    fireEvent.mouseDown(getByRole('button', { name: 'clear input' }));

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
});
