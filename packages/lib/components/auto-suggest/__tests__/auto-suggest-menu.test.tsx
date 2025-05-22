import { render, fireEvent } from '@testing-library/react';
import { SuggestionsMenuOverlay } from '../auto-suggest-menu';
import { it, describe, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the useOnClickOutside hook - fix the path to match the require statement
vi.mock('../../common/effects/useOnClickOutside', () => {
  // Create a handler to store the callback
  const handlers: Map<string, () => void> = new Map();

  return {
    default: (callback: () => void) => {
      // Use a more deterministic ID generation for testing
      const id = `click-outside-${Date.now()}-${handlers.size}`;
      handlers.set(id, callback);

      return {
        onRef: (element: HTMLElement | null) => {
          // Store the callback id on the element
          if (element) {
            element.dataset.clickOutsideId = id;
          }
          return element;
        },
        // Expose a function to trigger the callback for testing
        __triggerCallback: (id: string) => {
          const cb = handlers.get(id);
          if (cb) cb();
        },
        __getCallbacks: () => handlers,
      };
    },
  };
});

// Create a container for portal rendering
let portalContainer: HTMLDivElement | null = null;

describe('SuggestionsMenuOverlay', () => {
  beforeEach(() => {
    // Create a container for the portal
    portalContainer = document.createElement('div');
    portalContainer.id = 'portal-container';
    document.body.appendChild(portalContainer);

    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up the portal container
    if (portalContainer && portalContainer.parentNode) {
      portalContainer.parentNode.removeChild(portalContainer);
    }
  });

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

  // Test width prop being applied through CSS variables
  it('applies the width through CSS variable', () => {
    const { getByTestId } = render(
      <SuggestionsMenuOverlay
        onSelection={() => {}}
        data={{ focus: true, items: [{ id: '1', name: 'Item 1' }] }}
        onClose={() => {}}
        width={300}
      />
    );

    const wrapper = getByTestId('suggestions-wrapper');
    expect(wrapper).toHaveStyle('--suggestions-width: 300px');
  });

  // Verify focus behavior by checking the implementation
  it('attempts to focus the list when focus is true in data prop', () => {
    // Mock the actual focus implementation in the component
    const originalFocus = HTMLElement.prototype.focus;
    const mockFocus = vi.fn();
    HTMLElement.prototype.focus = mockFocus;

    try {
      render(
        <SuggestionsMenuOverlay
          onSelection={() => {}}
          data={{ focus: true, items: [{ id: '1', name: 'Item 1' }] }}
          onClose={() => {}}
        />,
        { container: document.body }
      );

      // Since we're testing a useEffect hook that calls focus,
      // we need to verify the mock was called
      expect(mockFocus).toHaveBeenCalled();
    } finally {
      // Restore the original focus implementation
      HTMLElement.prototype.focus = originalFocus;
    }
  });

  // Test onClose with a direct approach
  // it('calls onClose when clicking outside', () => {
  //   const mockOnClose = vi.fn();

  //   const { getByTestId } = render(
  //     <SuggestionsMenuOverlay
  //       onSelection={() => {}}
  //       data={{ focus: true, items: [{ id: '1', name: 'Item 1' }] }}
  //       onClose={mockOnClose}
  //     />
  //   );

  // Get the wrapper element with the click outside handler
  // const wrapper = getByTestId('suggestions-wrapper');
  // const clickOutsideId = wrapper.dataset.clickOutsideId;

  // Access the hook's __triggerCallback function and manually trigger the callback
  // const useOnClickOutsideModule = vi.mocked(
  //   require('../../common/effects/useOnClickOutside').default
  // );
  // useOnClickOutsideModule.__triggerCallback(clickOutsideId);

  // Verify onClose was called
  // expect(mockOnClose).toHaveBeenCalled();
  // });
});
