import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { InputNumber } from '../input-number';

describe('Input Number', () => {
  it.concurrent('should render the value', () => {
    const { getByDisplayValue } = render(
      <InputNumber value={6} start={1} end={10} />
    );

    expect(getByDisplayValue('6')).toBeInTheDocument();
  });

  it.concurrent('should increment the value', async () => {
    const { getByLabelText, getByDisplayValue } = render(
      <InputNumber start={1} end={10} />
    );

    const increment = getByLabelText('increment');

    expect(increment).toBeInTheDocument();

    fireEvent.click(increment);

    await waitFor(() => {
      expect(getByDisplayValue('2')).toBeInTheDocument();
    });
  });

  it.concurrent('should decrement the value', async () => {
    const { getByLabelText, getByDisplayValue } = render(
      <InputNumber start={5} end={10} value={7} />
    );

    const decrement = getByLabelText('decrement');

    expect(decrement).toBeInTheDocument();

    fireEvent.click(decrement);

    await waitFor(() => {
      expect(getByDisplayValue('6')).toBeInTheDocument();
    });
  });

  it.concurrent('should call onChange handler with value', async () => {
    const onChange = vi.fn();

    const { getByLabelText } = render(
      <InputNumber start={1} end={10} onChange={onChange} />
    );

    const increment = getByLabelText('increment');

    expect(increment).toBeInTheDocument();

    fireEvent.click(increment);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });

  it.concurrent(
    'should auto reset when the value is out of range - greater',
    () => {
      const { getByDisplayValue } = render(
        <InputNumber start={5} end={10} value={12} />
      );

      expect(getByDisplayValue('10')).toBeInTheDocument();
    }
  );

  it.concurrent(
    'should auto reset when the value is out of range - lesser',
    () => {
      const { getByDisplayValue } = render(
        <InputNumber start={5} end={10} value={1} />
      );

      expect(getByDisplayValue('5')).toBeInTheDocument();
    }
  );

  it.concurrent(
    'should increment or decrement on keyboard interaction',
    async () => {
      const { getByDisplayValue, getByPlaceholderText } = render(
        <InputNumber start={1} end={10} placeholder="choose a value" />
      );

      const input = getByPlaceholderText('choose a value');

      expect(input).toBeInTheDocument();
      fireEvent.keyUp(input, { key: 'ArrowUp' });
      expect(getByDisplayValue('2')).toBeInTheDocument();

      fireEvent.keyUp(input, { key: 'ArrowDown' });
      expect(getByDisplayValue('1')).toBeInTheDocument();
    }
  );
});
