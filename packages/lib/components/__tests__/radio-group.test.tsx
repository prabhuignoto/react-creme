import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RadioGroup } from '../inputs/radio-group/radio-group';

const items = [
  { id: '23', label: 'one', value: 'one' },
  { id: '45', label: 'two', value: 'two' },
];

const handler = vi.fn();

describe('Radio Group', () => {
  it.concurrent('should render the radio group', () => {
    const { getByRole, getAllByRole } = render(<RadioGroup items={items} />);

    expect(getByRole('radiogroup')).toBeInTheDocument();
    expect(getAllByRole('radio')).toHaveLength(2);
  });

  it.concurrent('should call the handler', async () => {
    const { getAllByRole } = render(
      <RadioGroup items={items} onSelected={handler} />
    );
    fireEvent.click(getAllByRole('radio')[0]);

    await waitFor(async () => {
      expect(handler).toBeCalledWith('one');
    });
  });
});
