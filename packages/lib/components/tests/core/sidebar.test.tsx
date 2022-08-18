import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Sidebar } from '../../core/sidebar/sidebar';

describe('Sidebar', () => {
  it.concurrent('should render', () => {
    const { getAllByRole, getByText } = render(
      <Sidebar
        groups={[
          {
            items: [{ name: 'item1' }, { name: 'item2' }],
            title: 'one',
          },
          {
            items: [{ name: 'item3' }, { name: 'item4' }],
            title: 'two',
          },
          {
            items: [{ name: 'item5' }, { name: 'item6' }],
            title: 'three',
          },
        ]}
      />
    );

    expect(getAllByRole('group')).toHaveLength(3);
    expect(getByText('one')).toBeInTheDocument();
  });

  it.concurrent('should call handler', async () => {
    const handler = vi.fn();
    const { getByText } = render(
      <Sidebar
        groups={[
          {
            items: [{ name: 'item1' }, { name: 'item2' }],
            title: 'one',
          },
          {
            items: [{ name: 'item3' }, { name: 'item4' }],
            title: 'two',
          },
          {
            items: [{ name: 'item5' }, { name: 'item6' }],
            title: 'three',
          },
        ]}
        onSelect={handler}
      />
    );

    fireEvent.click(getByText('item5'));

    await waitFor(() => {
      expect(handler).toBeCalled();
    });
  });
});
