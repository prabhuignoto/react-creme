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

  it('should sort data when a sortable column is clicked', async () => {
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

    await user.click(sortButtons[0]); // Sort ascending
    expect(screen.getByText('Jane')).toBeInTheDocument();

    await user.click(sortButtons[1]); // Sort descending
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<DataGrid columns={mockColumns} data={mockData} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
