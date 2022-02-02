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

  it('should render state', () => {
    const { getAllByRole } = render(<Input state="error" />);

    expect(getAllByRole('textbox')[0]).toBeInTheDocument();
    expect(getAllByRole('textbox')[0]).toHaveClass('rc-input-error');
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
    const { getByRole } = render(<Input onChange={handler} enableClear />);

    fireEvent.mouseDown(getByRole('button'));

    await waitFor(async () => expect(handler).toBeCalledWith(''));
  });
});
