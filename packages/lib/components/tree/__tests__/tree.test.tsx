import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
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

    expect(getAllByRole('treeitem')[0]).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    fireEvent.click(
      getAllByRole('treeitem')[0].querySelector(
        "[role='button']"
      ) as HTMLElement
    );

    await waitFor(() => {
      expect(getAllByRole('treeitem')[0]).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });

  // it.concurrent('should be checked', () => {
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
      getAllByRole('treeitem')[0].querySelector(
        "[role='button']"
      ) as HTMLElement
    );

    expect(onSelect).toHaveBeenCalled();
  });
});
