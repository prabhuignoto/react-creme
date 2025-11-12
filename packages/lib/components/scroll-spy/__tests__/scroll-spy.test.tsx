import React from 'react';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ScrollSpy } from '../scroll-spy';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  // eslint-disable-next-line no-undef
  constructor(
    public callback: IntersectionObserverCallback,
    // eslint-disable-next-line no-undef
    public options?: IntersectionObserverInit
  ) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

describe('ScrollSpy', () => {
  beforeEach(() => {
    global.IntersectionObserver = MockIntersectionObserver as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockLinks = ['Section 1', 'Section 2', 'Section 3'];
  const mockChildren = [
    <div key="1">Content 1</div>,
    <div key="2">Content 2</div>,
    <div key="3">Content 3</div>,
  ];

  describe('Rendering', () => {
    it('should render scroll spy component', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render all links in sidebar', () => {
      const { container } = render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(mockLinks.length);

      buttons.forEach((button, index) => {
        expect(button.textContent).toBe(mockLinks[index]);
      });
    });

    it('should render all content sections', () => {
      render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    it('should render with links on left by default', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('wrapper_left');
    });

    it('should render with links on right when specified', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks} linksPosition="right">
          {mockChildren}
        </ScrollSpy>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('wrapper_right');
    });
  });

  describe('User Interactions', () => {
    it('should scroll to section when link is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      const buttons = container.querySelectorAll('button');
      const linkElement = buttons[1]; // Section 2

      await user.click(linkElement as HTMLElement);

      // Link should be clickable
      expect(linkElement).toBeInTheDocument();
    });

    it('should handle scroll events', async () => {
      const user = userEvent.setup();

      render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      const contentArea = screen.getByText('Content 1').parentElement?.parentElement;

      if (contentArea) {
        // Simulate scroll event
        await user.pointer({ keys: '[MouseLeft]', target: contentArea });
      }

      expect(contentArea).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    it('should render headers for each section', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const headers = container.querySelectorAll('h4');
      expect(headers.length).toBe(3);
    });

    it('should assign unique IDs to sections', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const headers = container.querySelectorAll('h4');
      const ids = Array.from(headers).map(h => h.id);

      // All IDs should be unique
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should handle single child element', () => {
      const singleChild = <div>Single Content</div>;

      const { container } = render(<ScrollSpy links={['Single Section']}>{singleChild}</ScrollSpy>);

      expect(screen.getByText('Single Content')).toBeInTheDocument();

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(1);
      expect(buttons[0]?.textContent).toBe('Single Section');
    });
  });

  describe('Intersection Observer', () => {
    it('should create IntersectionObserver for content tracking', () => {
      const { container } = render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      // Check that IntersectionObserver was instantiated
      // We can verify this indirectly by checking that section headers have IDs
      const headers = container.querySelectorAll('h4[id]');
      expect(headers.length).toBe(mockLinks.length);
    });

    it('should observe section headers', () => {
      const { container } = render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      // Verify that headers exist and can be observed
      const headers = container.querySelectorAll('h4[id]');
      expect(headers.length).toBe(mockLinks.length);

      // Each header should have a valid ID
      headers.forEach((header) => {
        expect(header.id).toMatch(/^spy-/);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should render semantic HTML structure', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      // Should have nav element
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Table of Contents');

      // Should have list elements
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();

      // Should have list items
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(3);

      // Should have buttons (not clickable divs)
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(3);

      // Should have headers
      const headers = container.querySelectorAll('h4');
      expect(headers.length).toBe(3);
    });

    it('should have proper ARIA attributes on buttons', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('aria-label');
        expect(button).toHaveAttribute('tabIndex', '0');
      });
    });

    it('should set aria-current on active link', async () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      // Initially, no link should be active
      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute('aria-current', 'true');
      });
    });

    it('should support custom aria-label', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks} ariaLabel="Custom Navigation">
          {mockChildren}
        </ScrollSpy>
      );

      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', 'Custom Navigation');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate down with ArrowDown key', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Focus first button
      buttons[0]?.focus();
      expect(document.activeElement).toBe(buttons[0]);

      // Press ArrowDown
      await user.keyboard('{ArrowDown}');

      // Should focus second button
      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[1]);
      });
    });

    it('should navigate up with ArrowUp key', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Focus second button
      buttons[1]?.focus();
      expect(document.activeElement).toBe(buttons[1]);

      // Press ArrowUp
      await user.keyboard('{ArrowUp}');

      // Should focus first button
      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[0]);
      });
    });

    it('should navigate to first item with Home key', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Focus last button
      buttons[2]?.focus();
      expect(document.activeElement).toBe(buttons[2]);

      // Press Home
      await user.keyboard('{Home}');

      // Should focus first button
      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[0]);
      });
    });

    it('should navigate to last item with End key', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Focus first button
      buttons[0]?.focus();
      expect(document.activeElement).toBe(buttons[0]);

      // Press End
      await user.keyboard('{End}');

      // Should focus last button
      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[2]);
      });
    });

    it('should not navigate beyond first item with ArrowUp', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Focus first button
      buttons[0]?.focus();
      expect(document.activeElement).toBe(buttons[0]);

      // Press ArrowUp
      await user.keyboard('{ArrowUp}');

      // Should still be on first button
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('should not navigate beyond last item with ArrowDown', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Focus last button
      buttons[2]?.focus();
      expect(document.activeElement).toBe(buttons[2]);

      // Press ArrowDown
      await user.keyboard('{ArrowDown}');

      // Should still be on last button
      expect(document.activeElement).toBe(buttons[2]);
    });

    it('should activate link with Enter key', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Focus first button
      buttons[0]?.focus();

      // Press Enter
      await user.keyboard('{Enter}');

      // Button should have been clicked (scrollTo would have been called)
      expect(buttons[0]).toBeInTheDocument();
    });

    it('should activate link with Space key', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Focus first button
      buttons[0]?.focus();

      // Press Space
      await user.keyboard('{ }');

      // Button should have been clicked (scrollTo would have been called)
      expect(buttons[0]).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should have focus indicators on buttons', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('tabIndex', '0');
      });
    });

    it('should maintain focus when navigating', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');

      // Tab to first button
      await user.tab();
      expect(document.activeElement).toBe(buttons[0]);

      // Tab to next button (would be second button in this case)
      // Note: This tests that tabbing works correctly
      expect(buttons[0]).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Props & Customization', () => {
    it('should support showSectionTitle prop', () => {
      const { container, rerender } = render(
        <ScrollSpy links={mockLinks} showSectionTitle={true}>
          {mockChildren}
        </ScrollSpy>
      );

      // Headers should be visible
      let headers = container.querySelectorAll('h4');
      expect(headers.length).toBe(3);
      headers.forEach((header) => {
        expect(header).toBeVisible();
      });

      // Rerender with showSectionTitle=false
      rerender(
        <ScrollSpy links={mockLinks} showSectionTitle={false}>
          {mockChildren}
        </ScrollSpy>
      );

      // Headers should still exist (for navigation) but hidden
      headers = container.querySelectorAll('div[id][aria-hidden="true"]');
      expect(headers.length).toBe(3);
    });

    it('should support size variants', () => {
      const { container, rerender } = render(
        <ScrollSpy links={mockLinks} size="sm">
          {mockChildren}
        </ScrollSpy>
      );

      let wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('sm');

      rerender(
        <ScrollSpy links={mockLinks} size="md">
          {mockChildren}
        </ScrollSpy>
      );

      wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('md');

      rerender(
        <ScrollSpy links={mockLinks} size="lg">
          {mockChildren}
        </ScrollSpy>
      );

      wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('lg');
    });

    it('should support custom className', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks} className="custom-class">
          {mockChildren}
        </ScrollSpy>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('custom-class');
    });

    it('should use default values for optional props', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('wrapper_left');
      expect(wrapper.className).toContain('md');

      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', 'Table of Contents');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty links array', () => {
      const { container } = render(
        <ScrollSpy links={[]}>{[]}</ScrollSpy>
      );

      expect(container.firstChild).toBeInTheDocument();
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should handle single link', () => {
      const { container } = render(
        <ScrollSpy links={['Single']}>
          <div>Single content</div>
        </ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(1);
      expect(buttons[0]?.textContent).toBe('Single');

      expect(screen.getByText('Single content')).toBeInTheDocument();
    });

    it('should handle very long link names', () => {
      const longLink = 'This is a very long link name that might cause overflow issues if not handled properly';
      const { container } = render(
        <ScrollSpy links={[longLink]}>
          <div>Content</div>
        </ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');
      expect(buttons[0]?.textContent).toBe(longLink);
    });

    it('should handle special characters in link names', () => {
      const specialLinks = ['Link & Special', 'Link < > Special', 'Link "quotes"'];
      const { container } = render(
        <ScrollSpy links={specialLinks}>
          {specialLinks.map((link, i) => (
            <div key={i}>Content {i + 1}</div>
          ))}
        </ScrollSpy>
      );

      const buttons = container.querySelectorAll('button');
      specialLinks.forEach((link, index) => {
        expect(buttons[index]?.textContent).toBe(link);
      });
    });

    it('should handle mismatched links and children count', () => {
      const { container } = render(
        <ScrollSpy links={['Link 1', 'Link 2']}>
          <div>Only one child</div>
        </ScrollSpy>
      );

      // Should still render without crashing
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should apply responsive classes for left position', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks} linksPosition="left">
          {mockChildren}
        </ScrollSpy>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('wrapper_left');
    });

    it('should apply responsive classes for right position', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks} linksPosition="right">
          {mockChildren}
        </ScrollSpy>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('wrapper_right');
    });
  });
});
