import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Sidebar } from '../sidebar';

describe('Sidebar', () => {
  it('should render', () => {
    const { getAllByRole, getByText } = render(
      <Sidebar
        groups={[
          {
            title: 'one',
            items: [{ name: 'item1' }, { name: 'item2' }],
          },
          {
            title: 'two',
            items: [{ name: 'item3' }, { name: 'item4' }],
          },
          {
            title: 'three',
            items: [{ name: 'item5' }, { name: 'item6' }],
          },
        ]}
      />
    );

    expect(getAllByRole('group')).toHaveLength(3);
    expect(getByText('one')).toBeInTheDocument();
  });

  it('should call handler', async () => {
    const handler = vi.fn();
    const { getByText } = render(
      <Sidebar
        groups={[
          {
            title: 'one',
            items: [{ name: 'item1' }, { name: 'item2' }],
          },
          {
            title: 'two',
            items: [{ name: 'item3' }, { name: 'item4' }],
          },
          {
            title: 'three',
            items: [{ name: 'item5' }, { name: 'item6' }],
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
