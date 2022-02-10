import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Tree } from '../tree';

describe('Tree', () => {
  it('should render tree', () => {
    const data = [
      {
        name: 'one',
        nodes: [{ name: 'two', nodes: [{ name: 'three' }] }],
      },
    ];

    const { getByRole, getAllByRole } = render(<Tree nodes={data} />);

    expect(getByRole('tree')).toBeInTheDocument();
    expect(getAllByRole('treeitem')).toHaveLength(3);
  });

  it('should have expanded  aria attribute', () => {
    const data = [
      {
        name: 'one',
        nodes: [{ name: 'two', nodes: [{ name: 'three' }] }],
      },
    ];

    const { getAllByRole } = render(<Tree nodes={data} />);

    expect(getAllByRole('treeitem')[0]).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('should expand and collapse', async () => {
    const data = [
      {
        name: 'one',
        nodes: [{ name: 'two', nodes: [{ name: 'three' }] }],
      },
    ];

    const { getAllByRole, getByRole } = render(<Tree nodes={data} />);

    expect(getAllByRole('treeitem')[0]).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    fireEvent.click(
      getAllByRole('treeitem')[0].querySelector("[role='button']")
    );

    await waitFor(() => {
      expect(getAllByRole('treeitem')[0]).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });
});
