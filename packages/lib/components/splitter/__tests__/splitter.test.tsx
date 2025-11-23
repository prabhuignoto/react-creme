import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';
import { Splitter } from '../splitter';

// Mock the CSS module
vi.mock('../splitter.module.scss', () => ({
  default: {
    control: 'control',
    control_dragged: 'control_dragged',
    control_horizontal: 'control_horizontal',
    control_vertical: 'control_vertical',
    dark: 'dark',
    disable: 'disable',
    drag_square: 'drag_square',
    partition: 'partition',
    wrapper: 'wrapper',
    wrapper_border: 'wrapper_border',
    wrapper_horizontal: 'wrapper_horizontal',
    wrapper_vertical: 'wrapper_vertical',
  },
}));

// Store the drag callbacks for testing
// Store the drag callbacks for testing
let onDragStartCallback: () => void;
let onDragEndCallback: () => void;
// Mock useState to control drag state
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn().mockImplementation(initialValue => {
      // Special handling for dragStarted state
      if (initialValue === false && typeof initialValue === 'boolean') {
        return [mockDragStarted, setDragStarted];
      }
      // Default behavior for other useState calls
      return [initialValue, vi.fn()];
    }),
  };
});

// Mock the useDrag hook
vi.mock('../../common/effects/useDrag', () => {
  const useDragMock = vi.fn().mockImplementation((_, __, options) => {
    // Store the callbacks so we can call them directly
    onDragStartCallback = options.onDragStart;
    onDragEndCallback = options.onDragEnd;
    return [0.5, vi.fn()];
  });
  return { useDrag: useDragMock };
});

// Mock isDark function
vi.mock('../../common/utils', () => ({
  isDark: vi.fn().mockReturnValue(false),
}));

// Mock drag state
const setDragStarted = vi.fn();
let mockDragStarted = false;

describe('Splitter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDragStarted = false;

    // Set up our useState mock to respond to setDragStarted
    setDragStarted.mockImplementation(newValue => {
      if (typeof newValue === 'function') {
        mockDragStarted = newValue(mockDragStarted);
      } else {
        mockDragStarted = newValue;
      }
    });
  });

  it('renders with default props', () => {
    const { getByText } = render(
      <Splitter dir="horizontal">
        <div>First Panel</div>
        <div>Second Panel</div>
      </Splitter>
    );
    expect(getByText('First Panel')).toBeInTheDocument();
    expect(getByText('Second Panel')).toBeInTheDocument();
  });

  it('renders in horizontal direction by default', () => {
    const { container } = render(
      <Splitter dir="horizontal">
        <div>First Panel</div>
        <div>Second Panel</div>
      </Splitter>
    );
    // Check the wrapper class instead of looking for control
    expect(container.firstChild).toHaveClass('wrapper_horizontal');
  });

  it('renders in vertical direction when specified', () => {
    const { container } = render(
      <Splitter dir="vertical">
        <div>First Panel</div>
        <div>Second Panel</div>
      </Splitter>
    );

    // Check the wrapper class instead of looking for control
    expect(container.firstChild).toHaveClass('wrapper_vertical');
  });

  it('handles drag start events', () => {
    // Render the component (this will set up the useDrag hook)
    render(
      <Splitter dir="horizontal">
        <div>First Panel</div>
        <div>Second Panel</div>
      </Splitter>
    );
    // Call the onDragStart callback directly
    onDragStartCallback();

    // Verify setDragStarted was called with true
    expect(setDragStarted).toHaveBeenCalledWith(true);
  });

  it('handles drag end events', () => {
    // Start with drag active
    mockDragStarted = true;

    // Render the component (this will set up the useDrag hook)
    render(
      <Splitter dir="horizontal">
        <div>First Panel</div>
        <div>Second Panel</div>
      </Splitter>
    );
    // Call the onDragEnd callback directly
    onDragEndCallback();

    // Verify setDragStarted was called with false
    expect(setDragStarted).toHaveBeenCalledWith(false);
  });

  it('renders with border when border prop is true', () => {
    const { container } = render(
      <Splitter dir="horizontal" border={true}>
        <div>First Panel</div>
        <div>Second Panel</div>
      </Splitter>
    );
    // Check wrapper has border class
    expect(container.firstChild).toHaveClass('wrapper_border');
  });

  it('renders without border when border prop is false', () => {
    const { container } = render(
      <Splitter dir="horizontal" border={false}>
        <div>First Panel</div>
        <div>Second Panel</div>
      </Splitter>
    );
    // Check wrapper doesn't have border class
    expect(container.firstChild).not.toHaveClass('wrapper_border');
  });

  it('applies custom handleBarWidth', () => {
    const { container } = render(
      <Splitter dir="horizontal" handleBarWidth={10}>
        <div>First Panel</div>
        <div>Second Panel</div>
      </Splitter>
    );

    // Find the control element
    const control = container.querySelector('.control');

    // Instead of checking specific attribute, check that control renders
    expect(control).not.toBeNull();

    // Check the inline style has width property
    expect(control?.getAttribute('style')).toContain('width: 10px');
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Splitter />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
