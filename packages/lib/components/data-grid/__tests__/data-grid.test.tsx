import React from 'react';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { DataGrid } from '../data-grid';

// Mock the debounce function to execute immediately in tests
vi.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: any) => fn,
}));

const mockColumns = [
  { name: 'name', type: 'string' as const },
  { name: 'age', type: 'number' as const },
];

const mockData = [
  { age: 30, name: 'John' },
  { age: 25, name: 'Jane' },
];

describe('DataGrid', () => {
  it('should render the grid with data', () => {
    render(<DataGrid columns={mockColumns} data={mockData} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('should filter data based on search input', async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        columns={[
          { name: 'name', searchable: true, type: 'string' },
          { name: 'age', type: 'number' },
        ]}
        data={mockData}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'Jane');

    await waitFor(() => {
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });

  it('should support sortable columns', async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        columns={[
          { name: 'name', sortable: true, type: 'string' },
          { name: 'age', type: 'number' },
        ]}
        data={mockData}
      />
    );

    const sortButtons = screen.getAllByRole('button');
    expect(sortButtons.length).toBeGreaterThan(0);

    // Click to sort
    await user.click(sortButtons[0]);

    // Verify data is still rendered
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('should handle empty data state', () => {
    render(
      <DataGrid
        columns={mockColumns}
        data={[]}
      />
    );

    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  it('should display column headers correctly', () => {
    const { container } = render(
      <DataGrid columns={mockColumns} data={mockData} />
    );

    const headers = container.querySelectorAll('[role="columnheader"]');
    expect(headers.length).toBeGreaterThanOrEqual(2);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<DataGrid columns={mockColumns} data={mockData} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
