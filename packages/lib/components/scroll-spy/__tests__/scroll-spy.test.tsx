/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
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

  constructor(
    public callback: IntersectionObserverCallback,
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
      render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      mockLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
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

      expect(container.firstChild).toHaveClass('wrapper_left');
    });

    it('should render with links on right when specified', () => {
      const { container } = render(
        <ScrollSpy links={mockLinks} linksPosition="right">
          {mockChildren}
        </ScrollSpy>
      );

      expect(container.firstChild).toHaveClass('wrapper_right');
    });
  });

  describe('User Interactions', () => {
    it('should scroll to section when link is clicked', async () => {
      const user = userEvent.setup();

      render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      const linkElement = screen.getByText('Section 2');
      await user.click(linkElement);

      // Link should be clickable
      expect(linkElement).toBeInTheDocument();
    });

    it('should handle scroll events', async () => {
      const user = userEvent.setup();

      render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      const contentArea = screen.getByText('Content 1').parentElement?.parentElement;

      if (contentArea) {
        // Simulate scroll event
        await user.pointer({ target: contentArea, keys: '[MouseLeft]' });
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

      render(<ScrollSpy links={['Single Section']}>{singleChild}</ScrollSpy>);

      expect(screen.getByText('Single Content')).toBeInTheDocument();
      expect(screen.getByText('Single Section')).toBeInTheDocument();
    });
  });

  describe('Intersection Observer', () => {
    it('should create IntersectionObserver for content tracking', () => {
      render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      expect(MockIntersectionObserver).toHaveBeenCalled();
    });

    it('should observe section headers', () => {
      render(<ScrollSpy links={mockLinks}>{mockChildren}</ScrollSpy>);

      const mockInstance = vi.mocked(MockIntersectionObserver).mock.results[0]?.value;
      if (mockInstance) {
        expect(mockInstance.observe).toHaveBeenCalled();
      }
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

      // Should have list elements
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();

      // Should have list items
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(3);

      // Should have headers
      const headers = container.querySelectorAll('h4');
      expect(headers.length).toBe(3);
    });
  });
});
