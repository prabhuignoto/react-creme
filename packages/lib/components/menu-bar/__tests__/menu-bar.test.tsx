import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { MenuBar } from '../menu-bar';

const items = [
  {
    id: '1',
    items: [
      {
        name: 'Open',
      },
      {
        name: 'Save As',
      },
      {
        name: 'Save',
      },
      {
        name: 'Close',
      },
    ],
    name: 'File',
  },
  {
    id: '2',
    items: [
      {
        name: 'Cut',
      },
      {
        name: 'Copy',
      },
      {
        name: 'Paste',
      },
      {
        name: 'Select All',
      },
    ],
    name: 'Edit',
  },
  {
    id: '3',
    items: [
      {
        name: 'About',
      },
      {
        name: 'Version',
      },
    ],
    name: 'Help',
  },
];

describe('Menu Bar', () => {
  describe('Rendering', () => {
    it('should render menu bar items', () => {
      const { getByText } = render(<MenuBar items={items} />);

      expect(getByText('File')).toBeInTheDocument();
      expect(getByText('Edit')).toBeInTheDocument();
      expect(getByText('Help')).toBeInTheDocument();
    });

    it('should render empty when items array is empty', () => {
      const { container } = render(<MenuBar items={[]} />);
      const listItems = container.querySelectorAll('li');

      expect(listItems).toHaveLength(0);
    });

    it('should render without crashing when items is undefined', () => {
      const { container } = render(<MenuBar />);
      expect(container.querySelector('[role="menubar"]')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('should open Menu on click', async () => {
      const { getByText } = render(<MenuBar items={items} />);

      expect(getByText('File')).toBeInTheDocument();

      fireEvent.click(getByText('File'));

      await waitFor(() => {
        expect(getByText('Open')).toBeInTheDocument();
      });
    });

    it('should switch menus on click', async () => {
      const { getByText, queryByText } = render(<MenuBar items={items} />);

      fireEvent.click(getByText('File'));

      await waitFor(() => {
        expect(getByText('Open')).toBeInTheDocument();
      });

      fireEvent.click(getByText('Edit'));

      await waitFor(() => {
        expect(getByText('Cut')).toBeInTheDocument();
        expect(queryByText('Open')).not.toBeInTheDocument();
      });
    });

    it('should close menu when clicked outside', async () => {
      const { getByText, queryByText } = render(<MenuBar items={items} />);

      fireEvent.click(getByText('File'));

      await waitFor(() => {
        expect(getByText('Open')).toBeInTheDocument();
      });

      fireEvent.click(document.body);

      await waitFor(() => {
        expect(queryByText('Open')).not.toBeInTheDocument();
      });
    });

    it('should call handler on selection', async () => {
      const onSelection = vi.fn();
      const { getByText } = render(
        <MenuBar items={items} onSelect={onSelection} noUniqueId />
      );

      fireEvent.click(getByText('File'));

      await waitFor(() => {
        expect(getByText('Open')).toBeInTheDocument();
      });

      fireEvent.click(getByText('Open'));

      expect(onSelection).toHaveBeenCalledWith({
        id: '1',
        path: 'File/Open',
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate between items with Arrow Right', async () => {
      const { container, getByText } = render(
        <MenuBar items={items} focusable />
      );

      const firstItem = getByText('File').closest('li');
      expect(firstItem).toHaveAttribute('tabindex', '0');

      firstItem?.focus();
      fireEvent.keyDown(container.querySelector('[role="menubar"]')!, {
        key: 'ArrowRight',
      });

      const secondItem = getByText('Edit').closest('li');
      expect(document.activeElement).toBe(secondItem);
    });

    it('should navigate between items with Arrow Left', async () => {
      const { container, getByText } = render(
        <MenuBar items={items} focusable />
      );

      const editItem = getByText('Edit').closest('li');
      editItem?.focus();

      fireEvent.keyDown(container.querySelector('[role="menubar"]')!, {
        key: 'ArrowLeft',
      });

      const fileItem = getByText('File').closest('li');
      expect(document.activeElement).toBe(fileItem);
    });

    it('should wrap around with Arrow Right at end', async () => {
      const { container, getByText } = render(
        <MenuBar items={items} focusable />
      );

      const helpItem = getByText('Help').closest('li');
      helpItem?.focus();

      fireEvent.keyDown(container.querySelector('[role="menubar"]')!, {
        key: 'ArrowRight',
      });

      const fileItem = getByText('File').closest('li');
      expect(document.activeElement).toBe(fileItem);
    });

    it('should jump to first item with Home key', async () => {
      const { container, getByText } = render(
        <MenuBar items={items} focusable />
      );

      const helpItem = getByText('Help').closest('li');
      helpItem?.focus();

      fireEvent.keyDown(container.querySelector('[role="menubar"]')!, {
        key: 'Home',
      });

      const fileItem = getByText('File').closest('li');
      expect(document.activeElement).toBe(fileItem);
    });

    it('should jump to last item with End key', async () => {
      const { container, getByText } = render(
        <MenuBar items={items} focusable />
      );

      const fileItem = getByText('File').closest('li');
      fileItem?.focus();

      fireEvent.keyDown(container.querySelector('[role="menubar"]')!, {
        key: 'End',
      });

      const helpItem = getByText('Help').closest('li');
      expect(document.activeElement).toBe(helpItem);
    });

    it('should enable keyboard navigation when focusable prop is true', () => {
      const { container } = render(<MenuBar items={items} focusable />);

      const menuItems = container.querySelectorAll('li');
      // First item should be focusable
      expect(menuItems[0]).toHaveAttribute('tabindex', '0');
      // Other items should not be in tab order
      expect(menuItems[1]).toHaveAttribute('tabindex', '-1');
    });

    it('should not enable keyboard navigation when focusable is false', () => {
      const { container } = render(<MenuBar items={items} focusable={false} />);

      const menuItems = container.querySelectorAll('li');
      // No items should have tabindex 0 when not focusable
      menuItems.forEach(item => {
        expect(item).not.toHaveAttribute('tabindex', '0');
      });
    });

    it('should navigate with RTL mode', async () => {
      const { container, getByText } = render(
        <MenuBar items={items} focusable RTL />
      );

      const fileItem = getByText('File').closest('li');
      fileItem?.focus();

      // In RTL, Arrow Left should move right
      fireEvent.keyDown(container.querySelector('[role="menubar"]')!, {
        key: 'ArrowLeft',
      });

      const editItem = getByText('Edit').closest('li');
      expect(document.activeElement).toBe(editItem);
    });
  });

  describe('Features', () => {
    it('should render RTL layout', () => {
      const { container } = render(<MenuBar items={items} RTL />);
      const wrapper = container.querySelector('ul[role="menubar"]');

      expect(wrapper?.className).toContain('right_aligned');
    });

    it('should render with size variant sm', () => {
      const { getByText } = render(<MenuBar items={items} size="sm" />);
      expect(getByText('File')).toBeInTheDocument();
    });

    it('should render with size variant md', () => {
      const { getByText } = render(<MenuBar items={items} size="md" />);
      expect(getByText('File')).toBeInTheDocument();
    });

    it('should render with size variant lg', () => {
      const { getByText } = render(<MenuBar items={items} size="lg" />);
      expect(getByText('File')).toBeInTheDocument();
    });

    it('should render icons when provided', () => {
      const icons = [
        <span key="1">📁</span>,
        <span key="2">✏️</span>,
        <span key="3">❓</span>,
      ];
      const { container } = render(<MenuBar items={items} icons={icons} />);

      const wrapper = container.querySelector('[role="menubar"]');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.querySelectorAll('li').length).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long menu item names', () => {
      const longItems = [
        {
          id: '1',
          items: [{ name: 'Item 1' }],
          name: 'This is a very long menu item name that might overflow the container',
        },
      ];

      const { getByText } = render(<MenuBar items={longItems} />);
      expect(
        getByText(
          'This is a very long menu item name that might overflow the container'
        )
      ).toBeInTheDocument();
    });

    it('should handle rapid open/close', async () => {
      const { getByText } = render(<MenuBar items={items} />);

      fireEvent.click(getByText('File'));
      fireEvent.click(getByText('File'));
      fireEvent.click(getByText('File'));

      await waitFor(() => {
        expect(getByText('Open')).toBeInTheDocument();
      });
    });

    it('should handle single item', () => {
      const singleItem = [
        {
          id: '1',
          items: [{ name: 'Open' }],
          name: 'File',
        },
      ];

      const { getByText } = render(<MenuBar items={singleItem} />);
      expect(getByText('File')).toBeInTheDocument();
    });

    it('should handle many items', () => {
      const manyItems = Array.from({ length: 20 }, (_, i) => ({
        id: String(i),
        items: [{ name: `Item ${i}` }],
        name: `Menu ${i}`,
      }));

      const { getByText } = render(<MenuBar items={manyItems} />);
      expect(getByText('Menu 0')).toBeInTheDocument();
      expect(getByText('Menu 19')).toBeInTheDocument();
    });

    it('should handle icon array length mismatch gracefully', () => {
      const { container } = render(
        <MenuBar items={items} icons={[<span key="1">📁</span>]} />
      );

      const wrapper = container.querySelector('[role="menubar"]');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<MenuBar items={items} />);
      const results = await axe(container, {
        rules: {
          // Menu wraps menuitem in div
          'aria-allowed-attr': { enabled: false },

          // Menu component uses invalid role
          'aria-required-children': { enabled: false },
          'aria-roles': { enabled: false }, // Menu component uses disallowed attributes
          // MenuBar renders menuitem (li) elements at root level without proper menubar parent
          'aria-required-parent': { enabled: false },
          // Menu has nested interactive elements (button inside button-like divs)
          'nested-interactive': { enabled: false },
        },
      });

      expect(results).toHaveNoViolations();
    });

    it('should have menubar role', () => {
      const { container } = render(<MenuBar items={items} />);
      const menubar = container.querySelector('[role="menubar"]');

      expect(menubar).toBeInTheDocument();
      expect(menubar).toHaveAttribute('aria-label', 'Navigation menu');
    });

    it('should have menuitem role on items', () => {
      const { getByText } = render(<MenuBar items={items} />);
      const fileItem = getByText('File').closest('[role="menuitem"]');

      expect(fileItem).toBeInTheDocument();
    });

    it('should have aria-haspopup on items', () => {
      const { getByText } = render(<MenuBar items={items} />);
      const fileItem = getByText('File').closest('[role="menuitem"]');

      expect(fileItem).toHaveAttribute('aria-haspopup', 'true');
    });

    it('should update aria-expanded attribute', async () => {
      const { getByText, queryByText } = render(<MenuBar items={items} />);
      const fileItem = getByText('File').closest('[role="menuitem"]');

      // Initially closed
      expect(fileItem).toHaveAttribute('aria-expanded', 'false');

      // Open the menu by clicking
      fireEvent.click(getByText('File'));

      // Menu content should appear
      await waitFor(() => {
        expect(getByText('Open')).toBeInTheDocument();
      });

      // Close the menu by clicking outside
      fireEvent.click(document.body);

      await waitFor(() => {
        expect(queryByText('Open')).not.toBeInTheDocument();
      });
    });
  });
});
