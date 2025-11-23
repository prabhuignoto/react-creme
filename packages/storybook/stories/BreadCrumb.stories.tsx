import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { BreadCrumb } from '../../lib/components';
export {
  CustomIcon,
  CustomSize,
  Default,
  RTL,
  SelectedIndex,
  Slash,
} from '../../documentation/components/bread-crumb/widget-variants';

export default {
  component: BreadCrumb,
  title: 'Navigation/BreadCrumb',
  tags: ['autodocs'],
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Hierarchical navigation component that displays the user's current location within the site
structure and enables quick access to parent pages. Breadcrumbs improve user wayfinding by
showing the path from root to current page.

## Key Features

- 🎹 **Full Keyboard Navigation** - Arrow keys, Home, End support
- 🎨 **Customizable Separators** - Chevron, arrow, or slash icons
- 📏 **Three Size Variants** - sm, md, lg for different design needs
- 🌍 **RTL Support** - Automatic layout reversal for RTL languages
- ♿ **WCAG 2.1 AA Compliant** - Semantic HTML with proper ARIA
- ⚡ **Optimized Performance** - React.memo and useMemo optimization

## When to Use

- Multi-level navigation structures (3+ levels deep)
- E-commerce product categories and subcategories
- Content management systems with hierarchical content
- Dashboard applications with nested sections
- Any application requiring user location awareness
        `,
      },
    },
  },
  argTypes: {
    links: {
      control: 'object',
      description: '**Required.** Array of breadcrumb labels representing the navigation hierarchy',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onSelected: {
      action: 'selected',
      description: 'Callback invoked when user clicks or navigates to a breadcrumb item',
      table: {
        type: { summary: '(selected?: string) => void' },
      },
    },
    icon: {
      control: { type: 'select' },
      options: ['chevron', 'arrow', 'slash'],
      description: 'Separator icon style displayed between breadcrumb items',
      table: {
        type: { summary: "'chevron' | 'arrow' | 'slash'" },
        defaultValue: { summary: "'chevron'" },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Visual size of breadcrumb text and icons',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'sm'" },
      },
    },
    focusable: {
      control: 'boolean',
      description: 'Enables keyboard navigation with arrow keys (Left/Right, Home, End)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    selectedCrumbIndex: {
      control: { type: 'number', min: 0 },
      description: 'Zero-based index of initially selected breadcrumb item',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    RTL: {
      control: 'boolean',
      description: 'Right-to-left layout mode for RTL languages (Arabic, Hebrew, etc.)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} as ComponentMeta<typeof BreadCrumb>;
