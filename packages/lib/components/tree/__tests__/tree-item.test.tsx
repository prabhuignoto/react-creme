import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Tree } from '../tree';

const items = [
  {
    name: 'Edit',
    child: [
      { name: 'Copy' },
      {
        name: 'Paste',
        child: [{ name: 'Paste Image' }, { name: 'Paste Doc' }],
      },
    ],
  },
  {
    name: 'Explorer',
    child: [{ name: 'search' }, { name: 'replace' }, { name: 'copy' }],
  },
];

describe('Tree', () => {
  it('should render Tree', () => {
    const { getByRole, getByText, getAllByRole } = render(
      <Tree items={items} />
    );

    expect(getByRole('tree')).toBeInTheDocument();

    expect(getByText('Explorer')).toBeInTheDocument();

    expect(getAllByRole('treeitem')).toHaveLength(2);
  });

  it('should render expand and collapse tree', async () => {
    const { getAllByRole, getByText } = render(<Tree items={items} />);

    const target = getAllByRole('treeitem')[1].firstChild;

    if (target) {
      await act(async () => {
        fireEvent.click(target);
      });

      await waitFor(
        async () => {
          expect(getByText('replace')).toBeInTheDocument();
        },
        { timeout: 1500 }
      );
    }
  });
});
