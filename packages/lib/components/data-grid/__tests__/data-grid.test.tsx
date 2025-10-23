import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { DataGrid } from '../data-grid';

// Mock the debounce function to execute immediately in tests
vi.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: any) => fn,
}));

describe('DataGrid', () => {
  it('should render the grid with data', async () => {
    const { getByText } = render(
      <DataGrid
        columns={[
          { name: 'name', type: 'string' },
          { name: 'age', type: 'number' },
        ]}
        data={[
          { age: 30, name: 'John' },
          { age: 25, name: 'Jane' },
        ]}
      />
    );

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Jane')).toBeInTheDocument();
  });

  it('should filter data based on search input', async () => {
    const user = userEvent.setup();

    const { getByPlaceholderText, queryByText } = render(
      <DataGrid
        columns={[
          { name: 'name', searchable: true, type: 'string' },
          { name: 'age', type: 'number' },
        ]}
        data={[
          { age: 30, name: 'John' },
          { age: 25, name: 'Jane' },
        ]}
      />
    );

    // Get the search input and type in it
    const searchInput = getByPlaceholderText('Search...');
    await user.type(searchInput, 'Jane');

    // Wait for the filtering to take effect
    await waitFor(() => {
      expect(queryByText('John')).not.toBeInTheDocument();
      expect(queryByText('Jane')).toBeInTheDocument();
    });
  });

  it('should sort data when a sortable column is clicked', async () => {
    const { getByText, getAllByRole } = render(
      <DataGrid
        columns={[
          { name: 'name', sortable: true, type: 'string' },
          { name: 'age', type: 'number' },
        ]}
        data={[
          { age: 30, name: 'John' },
          { age: 25, name: 'Jane' },
        ]}
      />
    );

    const sortButtons = getAllByRole('button');
    sortButtons[0].click(); // Sort ascending
    expect(getByText('Jane')).toBeInTheDocument();

    sortButtons[1].click(); // Sort descending
    expect(getByText('John')).toBeInTheDocument();
  });
});
