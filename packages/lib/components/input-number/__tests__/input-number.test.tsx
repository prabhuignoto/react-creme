import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, it, fn } from 'vitest';
import { InputNumber } from '../input-number';

describe('Input Number', () => {
  it('should render the value', () => {
    const { getByDisplayValue } = render(<InputNumber value={23} />);

    expect(getByDisplayValue('23')).toBeInTheDocument();
  });

  it('should increment the value', async () => {
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

  it('should call onChange handler with value', async () => {
    const onChange = fn();

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
});
