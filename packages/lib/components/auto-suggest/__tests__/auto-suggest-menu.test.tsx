import { render, fireEvent } from '@testing-library/react';
import { SuggestionsMenuOverlay } from '../auto-suggest-menu';
import { it, describe, expect, vi } from 'vitest';

describe('SuggestionsMenuOverlay', () => {
  // Test the component's rendering
  it('renders correctly', () => {
    const { getByTestId } = render(
      <SuggestionsMenuOverlay
        onSelection={() => {}}
        data={{ focus: true, items: [{ id: '1', name: 'Item 1' }] }}
        onClose={() => {}}
      />
    );

    expect(getByTestId('suggestions-wrapper')).toBeInTheDocument();
  });

  // Test component interactions
  it('calls onSelection when an item is clicked', () => {
    const mockOnSelection = vi.fn();
    const { getByText } = render(
      <SuggestionsMenuOverlay
        onSelection={mockOnSelection}
        data={{ focus: true, items: [{ id: '1', name: 'Item 1' }] }}
        onClose={() => {}}
      />
    );

    fireEvent.click(getByText('Item 1'));
    expect(mockOnSelection).toHaveBeenCalledWith([
      expect.objectContaining({ id: '1', name: 'Item 1' }),
    ]);
  });

  // Test component state and props
  it('renders items based on the data prop', () => {
    const { getByText } = render(
      <SuggestionsMenuOverlay
        onSelection={() => {}}
        data={{
          focus: true,
          items: [
            { id: '1', name: 'Item 1' },
            { id: '2', name: 'Item 2' },
          ],
        }}
        onClose={() => {}}
      />
    );

    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });
});
