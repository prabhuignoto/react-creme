import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Input } from '../input';

const handler = vi.fn();

describe('Input', () => {
  it('should render default', () => {
    const { getAllByRole } = render(<Input />);

    expect(getAllByRole('textbox')[0]).toBeInTheDocument();
    expect(getAllByRole('textbox')[0]).toHaveClass('rc-input-default');
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

    expect(container.firstChild).toHaveClass('rc-input-success');
  });

  it('should be in error state', () => {
    const { container } = render(<Input state="error" />);

    expect(container.firstChild).toHaveClass('rc-input-error');
  });

  it('should render the spinner', () => {
    const { getByTestId } = render(<Input showSpinner />);

    expect(getByTestId('rc-input-spinner')).toBeInTheDocument();
  });

  it('should render as autocomplete', () => {
    const { container } = render(<Input isAutoComplete />);

    expect(container.firstChild).toHaveAttribute('role', 'combobox');
  });
});
