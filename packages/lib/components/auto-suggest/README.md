# AutoSuggest Component

A fully-featured autocomplete/autosuggest component with advanced capabilities including multiple selection, grouped suggestions, virtualization for large lists, and comprehensive accessibility support.

## Features

- **Single & Multiple Selection**: Support both single and multiple item selection with optional limits
- **Grouped Suggestions**: Organize suggestions into labeled categories
- **Virtualization**: Efficiently render large lists (500+ items) with auto-enabling
- **API-Backed Mode**: Manage suggestions from external APIs without client-side filtering
- **Accessibility**: Full WAI-ARIA 2.1 compliance with keyboard navigation
- **RTL Support**: Right-to-left language support
- **Responsive Design**: Touch-friendly with design tokens
- **Theme Support**: Dark mode and custom theme integration
- **Performance**: Debounced onChange callbacks and non-blocking React 19 transitions

## Installation

The AutoSuggest component is part of the `react-creme` package:

```bash
npm install react-creme
# or
yarn add react-creme
pnpm add react-creme
```

## Basic Usage

```tsx
import { AutoSuggest } from 'react-creme';

const suggestions = [
  { name: 'Apple', value: 'apple' },
  { name: 'Banana', value: 'banana' },
  { name: 'Orange', value: 'orange' },
];

export function App() {
  return (
    <AutoSuggest
      suggestions={suggestions}
      placeholder="Search fruits"
      onSelection={(item) => console.log('Selected:', item)}
    />
  );
}
```

## API Reference

### Props

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `suggestions` | `AutoSuggestOption[]` | `[]` | Array of suggestion items for the dropdown |
| `placeholder` | `string` | `''` | Placeholder text for the input |
| `value` | `string` | `undefined` | Controlled value for the input |
| `onChange` | `(value?: string) => void` | `undefined` | Debounced callback when input changes |
| `onKeyDown` | `(ev: KeyboardEvent) => void` | `undefined` | Callback for keydown events |
| `onKeyUp` | `(ev: KeyboardEvent) => void` | `undefined` | Callback for keyup events |

#### Selection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelection` | `(selected: AutoSuggestOption) => void` | `undefined` | Callback when single item is selected |
| `onSelectionChange` | `(selected: AutoSuggestOption[]) => void` | `undefined` | Callback when multiple items selection changes |
| `multiple` | `boolean` | `false` | Enable multiple selection mode |
| `maxSelections` | `number` | `undefined` | Maximum items that can be selected (multiple mode only) |

#### Grouping Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `grouped` | `boolean` | `false` | Enable grouped suggestions mode |
| `groups` | `AutoSuggestGroup[]` | `[]` | Array of suggestion groups (when grouped is true) |

#### Virtualization Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `virtualized` | `boolean` | `false` | Enable virtualization (auto-enabled when items > threshold) |
| `virtualizationThreshold` | `number` | `50` | Item count threshold for auto-enabling virtualization |
| `itemHeight` | `number` | `35` | Height of each item in pixels |
| `overscan` | `number` | `3` | Number of items to render outside viewport for smooth scrolling |

#### API Integration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiBacked` | `boolean` | `false` | When true, all suggestions are shown without filtering |
| `debounce` | `number` | `100` | Debounce delay in milliseconds before onChange is called |
| `showSpinner` | `boolean` | `false` | Show loading spinner in the input |

#### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accent` | `'rounded' \| 'flat'` | `'flat'` | Visual style variant for the input |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Size variant for the input |
| `suggestionsWidth` | `number` | `250` | Width of the suggestions dropdown in pixels |
| `icon` | `ReactNode` | `<SearchIcon />` | Custom icon to display |
| `disableIcon` | `boolean` | `false` | Hide the search icon |
| `focusable` | `boolean` | `true` | Allow keyboard focus on the input |
| `rtl` | `boolean` | `false` | Enable right-to-left text direction |

#### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | `undefined` | ARIA label for screen readers |
| `aria-labelledby` | `string` | `undefined` | ID of element labeling this component |
| `aria-describedby` | `string` | `undefined` | ID of element describing this component |

### Types

```typescript
// Single suggestion option
type AutoSuggestOption = {
  name: string;
  value: string;
};

// Grouped suggestions
type AutoSuggestGroup = {
  label: string;
  items: AutoSuggestOption[];
};
```

## Usage Examples

### Single Selection

```tsx
const [selected, setSelected] = useState<AutoSuggestOption | null>(null);

<AutoSuggest
  suggestions={suggestions}
  placeholder="Select one"
  onSelection={setSelected}
/>
```

### Multiple Selection

```tsx
const [selected, setSelected] = useState<AutoSuggestOption[]>([]);

<AutoSuggest
  suggestions={suggestions}
  placeholder="Select multiple"
  multiple={true}
  maxSelections={5}
  onSelectionChange={setSelected}
/>
```

### Grouped Suggestions

```tsx
const groups = [
  {
    label: 'Fruits',
    items: [
      { name: 'Apple', value: 'apple' },
      { name: 'Banana', value: 'banana' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { name: 'Carrot', value: 'carrot' },
      { name: 'Broccoli', value: 'broccoli' },
    ],
  },
];

<AutoSuggest
  suggestions={[]}
  groups={groups}
  grouped={true}
  placeholder="Search by category"
  onSelection={setSelected}
/>
```

### Large Lists with Virtualization

```tsx
const manyItems = Array.from({ length: 10000 }, (_, i) => ({
  name: `Item ${i}`,
  value: `item-${i}`,
}));

<AutoSuggest
  suggestions={manyItems}
  placeholder="Search 10,000 items"
  virtualized={true}
  itemHeight={35}
/>
```

### API-Backed Suggestions

```tsx
const [suggestions, setSuggestions] = useState([]);
const [loading, setLoading] = useState(false);

const handleSearch = async (term?: string) => {
  if (!term) {
    setSuggestions([]);
    return;
  }

  setLoading(true);
  const results = await api.search(term);
  setSuggestions(results);
  setLoading(false);
};

<AutoSuggest
  suggestions={suggestions}
  placeholder="Search API results"
  onChange={handleSearch}
  showSpinner={loading}
  apiBacked={true}
  onSelection={setSelected}
/>
```

### Fully Accessible Form

```tsx
<div>
  <label htmlFor="search-id">Find a Product</label>
  <AutoSuggest
    suggestions={suggestions}
    placeholder="Enter product name"
    onSelection={setSelected}
    aria-label="Product search"
    aria-labelledby="search-id"
    aria-describedby="search-help"
  />
  <div id="search-help">Type to see suggestions, use arrow keys to navigate</div>
</div>
```

## Keyboard Navigation

| Key | Behavior |
|-----|----------|
| `ArrowDown` | Open suggestions menu or move to next item |
| `ArrowUp` | Return focus from menu to input |
| `Enter` | Select focused item |
| `Escape` | Close suggestions menu |
| `Tab` | Move focus to next element |

## Accessibility Features

- **WAI-ARIA 2.1 Compliant**: Full ARIA role and attribute support
- **Keyboard Navigation**: Complete keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels, descriptions, and live regions
- **Focus Indicators**: Clear focus visible outlines (WCAG 2.1 AA compliant)
- **Touch Targets**: 44×44px minimum touch targets
- **Dark Mode**: Automatic detection with proper contrast ratios

## Performance Optimization

### Virtualization
The component automatically enables virtualization when:
- Item count exceeds `virtualizationThreshold` (default: 50)
- Only visible items are rendered, dramatically improving performance for large lists
- Smooth scrolling with configurable overscan buffer

### Debouncing
- `onChange` callbacks are debounced by default (100ms)
- Configurable via the `debounce` prop
- Reduces unnecessary API calls

### React 19 Features
- `useTransition` for non-blocking filtering operations
- Keep UI responsive during expensive calculations
- Smooth loading states without frame drops

## Styling

### CSS Variables

The component uses design tokens for consistent styling:

```css
--suggestions-width: 250px; /* Width of dropdown */
```

### CSS Classes

```scss
.input_wrapper        /* Input container */
.suggestions_wrapper  /* Suggestions dropdown */
.auto_suggest         /* Root component */
.auto_suggest.rtl     /* RTL modifier */
.suggestions_wrapper.dark  /* Dark mode */
```

## Testing

The component includes comprehensive test coverage:

- **61+ Unit Tests**: Covering all features and edge cases
- **Accessibility Tests**: jest-axe compliance checks
- **Integration Tests**: Real-world usage scenarios
- **Edge Cases**: Special characters, large lists, async operations

### Running Tests

```bash
# Run all AutoSuggest tests
pnpm vitest --run components/auto-suggest

# Run with coverage
pnpm vitest --run --coverage components/auto-suggest
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE 11+ with polyfills
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- **Input**: Base input component
- **Dropdown**: Dropdown menu component
- **List**: Virtualized list component
- **Menu**: Menu component with ARIA support

## Migration Guide

### From v0.25 to v0.26+

**Major Changes:**
- State management refactored to use `useReducer` pattern
- Added `multiple` and `grouped` modes
- Added virtualization with auto-enable
- Enhanced ARIA attributes
- RegExp injection security fix

**Breaking Changes:**
- `onSelection` now receives full option object in multiple mode
- Use `onSelectionChange` callback for multiple selection
- `selectItem` reducer action signature changed (added itemId parameter)

**Upgrading:**

```tsx
// Before
<AutoSuggest
  suggestions={suggestions}
  onSelection={(option) => console.log(option)}
/>

// After (single selection - no change needed)
<AutoSuggest
  suggestions={suggestions}
  onSelection={(option) => console.log(option)}
/>

// Multiple selection (new feature)
<AutoSuggest
  suggestions={suggestions}
  multiple={true}
  onSelectionChange={(options) => console.log(options)}
/>
```

## Contributing

Contributions are welcome! Please ensure:
- All tests pass: `pnpm vitest --run`
- Code is formatted: `pnpm format`
- Linting passes: `pnpm lint`
- Accessibility is maintained: `jest-axe` tests included

## License

MIT - See LICENSE file for details
