import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from '../tabs';

describe('<Tabs />', () => {
  const labels = ['Tab1', 'Tab2', 'Tab3'];
  const children = [
    <div key="1">Content 1</div>,
    <div key="2">Content 2</div>,
    <div key="3">Content 3</div>,
  ];

  it('renders correctly', () => {
    render(<Tabs labels={labels} children={children} />);

    // Check if all labels are present
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeVisible();
    });

    // Check if the first tab's content is rendered
    expect(screen.getByText('Content 1')).toBeVisible();

    // Check if other tabs' content is not rendered
    expect(screen.queryByText('Content 2')).toBeNull();
    expect(screen.queryByText('Content 3')).toBeNull();
  });

  it('handles tab selection', () => {
    render(<Tabs labels={labels} children={children} />);

    // Select the second tab
    fireEvent.click(screen.getByText('Tab2'));

    // Check if the second tab's content is rendered
    expect(screen.getByText('Content 2')).toBeVisible();

    // Check if other tabs' content is not rendered
    expect(screen.queryByText('Content 1')).toBeNull();
    expect(screen.queryByText('Content 3')).toBeNull();
  });

  it('handles keyboard navigation', () => {
    render(<Tabs labels={labels} children={children} />);

    // Navigate to the second tab with the right arrow key
    fireEvent.keyDown(screen.getByText('Tab1'), { key: 'ArrowRight' });

    // Check if the second tab's content is rendered
    expect(screen.getByText('Content 2')).toBeVisible();

    // Navigate back to the first tab with the left arrow key
    fireEvent.keyDown(screen.getByText('Tab2'), { key: 'ArrowLeft' });

    // Check if the first tab's content is rendered
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Tabs />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
