import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Tree } from '../tree';

describe('Tree', () => {
  it('should render tree', async () => {
    const data = [
      {
        name: 'one',
        nodes: [{ name: 'two', nodes: [{ name: 'three' }] }],
      },
    ];

    const { getByRole, getAllByRole } = render(<Tree nodes={data} />);

    await waitFor(() => {
      expect(getAllByRole('treeitem')).toHaveLength(3);
      expect(getAllByRole('tree')).toHaveLength(3);
    });
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

  // it('should be checked', () => {
  //   const data = [
  //     {
  //       name: 'one',
  //       nodes: [{ name: 'two', nodes: [{ name: 'three' }] }],
  //     },
  //   ];

  //   const { getAllByRole } = render(<Tree nodes={data} selectable />);

  //   expect(getAllByRole('treeitem')[0]).toHaveAttribute(
  //     'aria-checked',
  //     'false'
  //   );
  // });

  it('should call the node on selection', () => {
    const data = [
      {
        name: 'one',
        nodes: [{ name: 'two', nodes: [{ name: 'three' }] }],
      },
    ];

    const onSelect = vi.fn();

    const { getAllByRole } = render(
      <Tree nodes={data} onSelected={onSelect} />
    );

    fireEvent.click(
      getAllByRole('treeitem')[0].querySelector("[role='button']")
    );

    expect(onSelect).toHaveBeenCalled();
  });
});
