import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Input } from '../input';
import styles from '../input.module.scss';

const handler = vi.fn();

describe('Input', () => {
  it('should render default', () => {
    const { getAllByRole } = render(<Input />);

    expect(getAllByRole('textbox')[0]).toBeInTheDocument();
    expect(getAllByRole('textbox')[0]).toHaveClass(styles.default);
  });

  it('should have the aria label', () => {
    const { container } = render(<Input state="error" placeholder="error" />);

    expect(container.firstChild).toHaveAttribute('aria-label', 'error');
  });

  it('should call onchange', async () => {
    const { getByPlaceholderText } = render(<Input onChange={handler} />);
    const input = getByPlaceholderText('Please enter a value ...');

    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });

    fireEvent.keyUp(input, {
      key: 'E',
    });

    await waitFor(() => expect(handler).toBeCalled());
  });

  it('should clear work', async () => {
    const handler = vi.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <Input
        onChange={handler}
        enableClear
        placeholder="enter"
        showSpinner={false}
      />
    );

    fireEvent.keyUp(getByPlaceholderText('enter'), {
      key: 'E',
    });

    await waitFor(() => {
      expect(getByTestId('rc-clear-input')).toBeInTheDocument();
    });

    fireEvent.mouseDown(getByTestId('rc-clear-input'));

    await waitFor(async () => expect(handler).toBeCalledWith(''));
  });

  it('should call onFocus', () => {
    const { getByPlaceholderText } = render(<Input onFocus={handler} />);
    const input = getByPlaceholderText('Please enter a value ...');

    fireEvent.focus(input);

    expect(handler).toBeCalled();
  });

  it('should be disabled', () => {
    const { getByPlaceholderText } = render(<Input disabled />);
    const input = getByPlaceholderText('Please enter a value ...');

    expect(input).toBeDisabled();
  });

  it('should be in success state', () => {
    const { container } = render(<Input state="success" />);

    expect(container.firstChild).toHaveClass(styles.success);
  });

  it('should be in error state', () => {
    const { container } = render(<Input state="error" />);

    expect(container.firstChild).toHaveClass(styles.error);
  });

  it('should render the spinner', () => {
    const { getByTestId } = render(<Input showSpinner />);

    expect(getByTestId('rc-input-spinner')).toBeInTheDocument();
  });

  it('should render as autocomplete', () => {
    const { container } = render(<Input isAutoComplete />);

    expect(container.firstChild).toHaveAttribute('role', 'combobox');
  });

  it('should honour the max length property', async () => {
    const { getByPlaceholderText } = render(
      <Input maxLength={3} placeholder="Please enter a value ..." />
    );

    const input = getByPlaceholderText('Please enter a value ...');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });

    await waitFor(() => expect((input as HTMLInputElement).value).toBe('tes'));
  });
});
