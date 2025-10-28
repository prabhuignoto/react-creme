/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataGridHeader } from '../data-grid-header';
import { vi } from 'vitest'; // Replace jest with vi from vitest

describe('DataGridHeader', () => {
  it('should render the headers correctly', async () => {
    const { getByText } = render(
      <DataGridHeader
        columns={[
          {
            name: 'property',
            type: 'string',
          },
          {
            name: 'value',
            type: 'string',
          },
        ]}
      />
    );

    expect(getByText('property')).toBeInTheDocument();
    expect(getByText('value')).toBeInTheDocument();
  });

  it('headers should be sortable', async () => {
    const { getByText, getAllByRole } = render(
      <DataGridHeader
        columns={[
          {
            name: 'property',
            sortable: true,
            type: 'string',
          },
          {
            name: 'value',
            type: 'string',
          },
        ]}
      />
    );

    expect(getByText('property')).toBeInTheDocument();
    expect(getByText('value')).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(2);
  });

  it('should trigger sorting when sort icons are clicked', async () => {
    const mockOnSort = vi.fn(); // Use vi.fn() instead of jest.fn()
    const { getAllByRole } = render(
      <DataGridHeader
        columns={[
          {
            name: 'property',
            sortable: true,
            type: 'string',
          },
        ]}
        onSort={mockOnSort}
      />
    );

    const sortButtons = getAllByRole('button');
    await userEvent.click(sortButtons[0]); // Ascending sort
    expect(mockOnSort).toHaveBeenCalledWith('property', 'asc');

    await userEvent.click(sortButtons[1]); // Descending sort
    expect(mockOnSort).toHaveBeenCalledWith('property', 'desc');
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <div role="table">
          <DataGridHeader
            columns={[
              { name: 'name', type: 'string' },
              { name: 'age', type: 'number' },
            ]}
          />
        </div>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
