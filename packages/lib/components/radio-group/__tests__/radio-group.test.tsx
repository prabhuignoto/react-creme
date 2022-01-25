import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { RadioGroup } from '../radio-group';

const items = [
  { label: 'one', id: '23', value: 'one' },
  { label: 'two', id: '45', value: 'two' },
];

const handler = vi.fn();

describe('Radio Group', () => {
  it('should render the radio group', () => {
    const { getByRole, getAllByRole } = render(<RadioGroup items={items} />);

    expect(getByRole('radiogroup')).toBeInTheDocument();
    expect(getAllByRole('radio')).toHaveLength(2);
  });

  it('should call the handler', async () => {
    const { getAllByRole } = render(
      <RadioGroup items={items} onSelected={handler} />
    );
    fireEvent.click(getAllByRole('radio')[0]);

    await waitFor(async () => {
      expect(handler).toBeCalledWith('one');
    });
  });
});
