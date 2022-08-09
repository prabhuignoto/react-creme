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

  it('should increment the value', async () => {
    const { getByLabelText, getByDisplayValue } = render(
      <InputNumber start={1} end={10} />,
      {
        container: document.body,
      }
    );

    const increment = getByLabelText('increment');

    expect(increment).toBeInTheDocument();

    fireEvent.click(increment);

    await waitFor(() => {
      expect(getByDisplayValue('2')).toBeInTheDocument();
    });
  });

  it('should decrement the value', async () => {
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

  it('should increment or decrement on keyboard interaction', async () => {
    const { getByLabelText, getByDisplayValue } = render(
      <InputNumber start={1} end={10} placeholder="choose a value" />,
      {
        container: document.body,
      }
    );

    const wrapper = getByLabelText('choose a value');

    const input = wrapper.querySelector('input');

    if (input) {
      expect(input).toBeInTheDocument();
      fireEvent.keyUp(input);

      await waitFor(() => {
        expect(input).toHaveValue('2');
      });

      fireEvent.keyUp(input);

      await waitFor(() => {
        expect(getByDisplayValue('3')).toBeInTheDocument();
      });
    }
  });
});
