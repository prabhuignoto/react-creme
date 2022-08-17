import { render } from '@testing-library/react';
import { DataGridHeader } from '../data/data-grid/data-grid-header';

describe('DataGridHeader', () => {
  it.concurrent('should render the headers correctly', async () => {
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

  it.concurrent('headers should be sortable', async () => {
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
});
