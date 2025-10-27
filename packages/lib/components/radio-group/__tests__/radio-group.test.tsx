/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RadioGroup } from '../radio-group';

const items = [
  { id: '23', label: 'one', value: 'one' },
  { id: '45', label: 'two', value: 'two' },
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

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<RadioGroup />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
