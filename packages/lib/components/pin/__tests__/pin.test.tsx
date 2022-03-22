import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, fn, it } from 'vitest';
import { Pin } from '../pin';

describe('Pin', () => {
  it('should render the pin input', () => {
    const { container } = render(<Pin />);

    const inputs = container.querySelectorAll("li input[type='number']");

    expect(inputs.length).toBe(4);
  });

  it('should render custom pin length', () => {
    const { container } = render(<Pin length={6} />);

    const inputs = container.querySelectorAll("li input[type='number']");

    expect(inputs.length).toBe(6);
  });

  it('should call the handler', async () => {
    const onChange = fn();
    const { container } = render(<Pin onChange={onChange} />);

    const inputs = container.querySelectorAll("li input[type='number']");

    fireEvent.change(inputs[0], { target: { value: '1' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(1);
    });

    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(1234);
    });
  });

  it('should next input have focus', async () => {
    const { container } = render(<Pin />);

    const inputs = container.querySelectorAll("li input[type='number']");

    fireEvent.change(inputs[0], { target: { value: '1' } });

    await waitFor(() => {
      expect(inputs[1]).toHaveFocus();
    });
  });
});
