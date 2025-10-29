/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { expect, describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('handles tab selection', async () => {
    const user = userEvent.setup();
    render(<Tabs labels={labels} children={children} />);

    // Select the second tab
    await user.click(screen.getByText('Tab2'));

    // Check if the second tab's content is rendered
    expect(screen.getByText('Content 2')).toBeVisible();

    // Check if other tabs' content is not rendered
    expect(screen.queryByText('Content 1')).toBeNull();
    expect(screen.queryByText('Content 3')).toBeNull();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Tabs labels={labels} children={children} />);

    const tabs = screen.getAllByRole('tab');

    // Navigate to the second tab with the right arrow key
    tabs[0].focus();
    await user.keyboard('{ArrowRight}');

    // Wait for the second tab's content to be rendered
    await waitFor(() => {
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    // Navigate back to the first tab with the left arrow key
    await user.keyboard('{ArrowLeft}');

    // Wait for the first tab's content to be rendered
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeVisible();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container} = render(
        <Tabs labels={labels} children={children} />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic HTML structure', () => {
      render(<Tabs labels={labels} children={children} />);

      // Check for tablist
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');

      // Check for tabs (buttons)
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);

      tabs.forEach(tab => {
        expect(tab.tagName).toBe('BUTTON');
      });
    });

    it('should have aria-selected on tabs', () => {
      render(<Tabs labels={labels} children={children} />);

      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    });

    it('should have aria-controls linking tabs to panels', () => {
      render(<Tabs labels={labels} children={children} />);

      const tabs = screen.getAllByRole('tab');
      const panel = screen.getByRole('tabpanel');

      const firstTab = tabs[0];
      const panelId = firstTab?.getAttribute('aria-controls');
      expect(panel.id).toBe(panelId);
    });

    it('should have icons with aria-hidden when provided', () => {
      const icons = [<span key="1">Icon1</span>, <span key="2">Icon2</span>];
      const { container } = render(
        <Tabs labels={labels} children={children} icons={icons} />
      );

      const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate to next tab with ArrowRight', async () => {
      const user = userEvent.setup();
      render(<Tabs labels={labels} children={children} />);

      const tabs = screen.getAllByRole('tab');

      // Focus first tab and press ArrowRight
      tabs[0]?.focus();
      await user.keyboard('{ArrowRight}');

      // Second tab content should be visible
      await waitFor(() => {
        expect(screen.getByText('Content 2')).toBeVisible();
      });
    });

    it('should navigate to previous tab with ArrowLeft', async () => {
      const user = userEvent.setup();
      render(<Tabs labels={labels} children={children} activeTab="Tab2" />);

      const tabs = screen.getAllByRole('tab');

      // Focus second tab and press ArrowLeft
      tabs[1]?.focus();
      await user.keyboard('{ArrowLeft}');

      // First tab content should be visible
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });
    });

    it('should wrap from last to first tab with ArrowRight', async () => {
      const user = userEvent.setup();
      render(<Tabs labels={labels} children={children} activeTab="Tab3" />);

      const tabs = screen.getAllByRole('tab');

      // Focus last tab and press ArrowRight
      tabs[2]?.focus();
      await user.keyboard('{ArrowRight}');

      // First tab content should be visible (wrapped)
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });
    });

    it('should wrap from first to last tab with ArrowLeft', async () => {
      const user = userEvent.setup();
      render(<Tabs labels={labels} children={children} />);

      const tabs = screen.getAllByRole('tab');

      // Focus first tab and press ArrowLeft
      tabs[0]?.focus();
      await user.keyboard('{ArrowLeft}');

      // Last tab content should be visible (wrapped)
      await waitFor(() => {
        expect(screen.getByText('Content 3')).toBeVisible();
      });
    });

    it('should jump to first tab with Home key', async () => {
      const user = userEvent.setup();
      render(<Tabs labels={labels} children={children} activeTab="Tab3" />);

      const tabs = screen.getAllByRole('tab');

      // Focus last tab and press Home
      tabs[2]?.focus();
      await user.keyboard('{Home}');

      // First tab content should be visible
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });
    });

    it('should jump to last tab with End key', async () => {
      const user = userEvent.setup();
      render(<Tabs labels={labels} children={children} />);

      const tabs = screen.getAllByRole('tab');

      // Focus first tab and press End
      tabs[0]?.focus();
      await user.keyboard('{End}');

      // Last tab content should be visible
      await waitFor(() => {
        expect(screen.getByText('Content 3')).toBeVisible();
      });
    });

    it('should skip disabled tabs during navigation', async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          labels={labels}
          children={children}
          disabledTabs={['Tab2']}
        />
      );

      const tabs = screen.getAllByRole('tab');

      // Focus first tab and press ArrowRight
      tabs[0]?.focus();
      await user.keyboard('{ArrowRight}');

      // Should skip Tab2 and go to Tab3
      await waitFor(() => {
        expect(screen.getByText('Content 3')).toBeVisible();
      });
    });

    it('should have only selected tab focusable (roving tabindex)', () => {
      render(<Tabs labels={labels} children={children} />);

      const tabs = screen.getAllByRole('tab');

      expect(tabs[0]).toHaveAttribute('tabindex', '0');
      expect(tabs[1]).toHaveAttribute('tabindex', '-1');
      expect(tabs[2]).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('Touch Targets', () => {
    it('should have minimum 44px height for tabs', () => {
      const { container } = render(<Tabs labels={labels} children={children} />);

      const tabs = container.querySelectorAll('button[role="tab"]');
      tabs.forEach(tab => {
        const styles = window.getComputedStyle(tab);
        const minHeight = parseInt(styles.minHeight);
        expect(minHeight).toBeGreaterThanOrEqual(44);
      });
    });
  });
});
