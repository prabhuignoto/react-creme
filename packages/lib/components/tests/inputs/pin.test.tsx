import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Pin } from '../../inputs/pin/pin';

describe('Pin', () => {
  it.concurrent('should render the pin input', () => {
    const { container } = render(<Pin />);

    const inputs = container.querySelectorAll("li input[type='number']");

    expect(inputs.length).toBe(4);
  });

  it.concurrent('should render custom pin length', () => {
    const { container } = render(<Pin length={6} />);

    const inputs = container.querySelectorAll("li input[type='number']");

    expect(inputs.length).toBe(6);
  });

  it.concurrent('should call the handler', async () => {
    const onChange = vi.fn();
    const { container } = render(<Pin onChange={onChange} />);

    const inputs = container.querySelectorAll("li input[type='number']");

    fireEvent.change(inputs[0], { target: { value: '1' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(1);
    });

    fireEvent.change(inputs[1], { target: { value: '2' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(12);
    });

    fireEvent.change(inputs[2], { target: { value: '3' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(123);
    });
  });

  it.concurrent('should next input have focus', async () => {
    const { container } = render(<Pin />);

    const inputs = container.querySelectorAll("li input[type='number']");

    fireEvent.change(inputs[0], { target: { value: '1' } });

    await waitFor(() => {
      expect(inputs[1]).toHaveFocus();
    });
  });

  it.concurrent('should not auto jump', () => {
    const { container } = render(<Pin autoJump={false} />);

    const inputs = container.querySelectorAll("li input[type='number']");

    fireEvent.change(inputs[0], { target: { value: '1' } });

    expect(inputs[1]).not.toHaveFocus();
  });
});
