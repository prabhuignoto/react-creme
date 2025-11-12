import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tree } from '../tree';

describe('Tree', () => {
  it('should render tree', async () => {
    const data = [
      {
        name: 'one',
        nodes: [{ name: 'two', nodes: [{ name: 'three' }] }],
      },
      { name: 'three' },
      { name: 'four' },
    ];

    const { getByText } = render(<Tree nodes={data} />);

    await waitFor(() => {
      expect(getByText('one')).toBeInTheDocument();
      expect(getByText('three')).toBeInTheDocument();
      expect(getByText('four')).toBeInTheDocument();
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

    const { getAllByRole } = render(<Tree nodes={data} />);

    const treeitem = getAllByRole('treeitem')[0];
    expect(treeitem).toHaveAttribute('aria-expanded', 'false');

    const heading = treeitem?.querySelector("[role='heading']") as HTMLElement;
    if (heading) {
      fireEvent.click(heading);

      await waitFor(() => {
        expect(treeitem).toHaveAttribute('aria-expanded', 'true');
      });
    }
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

    const treeitem = getAllByRole('treeitem')[0];
    const heading = treeitem?.querySelector("[role='heading']") as HTMLElement;
    if (heading) {
      fireEvent.click(heading);
      expect(onSelect).toHaveBeenCalled();
    }
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Tree nodes={[{ name: 'Node 1', value: '1' }]} />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
