import { ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';
import { Default } from '../../documentation/components/auto-suggest/widget-variants';
import { AutoSuggest } from '../../lib/components';

export default {
  component: AutoSuggest,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'AutoSuggest',
} as ComponentMeta<typeof AutoSuggest>;

// Default example from documentation
export const DefaultExample = () => <>{Default}</>;

// Basic Usage Example
export const BasicUsage = () => {
  const suggestions = [
    { name: 'Apple', value: 'apple' },
    { name: 'Apricot', value: 'apricot' },
    { name: 'Banana', value: 'banana' },
    { name: 'Blueberry', value: 'blueberry' },
    { name: 'Cherry', value: 'cherry' },
    { name: 'Carrot', value: 'carrot' },
  ];

  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);

  return (
    <div>
      <AutoSuggest
        suggestions={suggestions}
        placeholder="Search for fruits or vegetables"
        onSelection={setSelected}
      />
      {selected && (
        <p style={{ marginTop: '16px' }}>
          Selected: <strong>{selected.name}</strong>
        </p>
      )}
    </div>
  );
};

// Multiple Selection Example
export const MultipleSelection = () => {
  const suggestions = [
    { name: 'JavaScript', value: 'js' },
    { name: 'TypeScript', value: 'ts' },
    { name: 'Python', value: 'py' },
    { name: 'Java', value: 'java' },
    { name: 'Rust', value: 'rust' },
    { name: 'Go', value: 'go' },
  ];

  const [selected, setSelected] = useState<
    Array<{ name: string; value: string }>
  >([]);

  return (
    <div>
      <AutoSuggest
        suggestions={suggestions}
        placeholder="Select programming languages"
        multiple={true}
        maxSelections={5}
        onSelectionChange={setSelected}
      />
      {selected.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <p>
            Selected {selected.length} language{selected.length !== 1 ? 's' : ''}:
          </p>
          <ul style={{ marginLeft: '16px' }}>
            {selected.map(item => (
              <li key={item.value}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Grouped Suggestions Example
export const GroupedSuggestions = () => {
  const groupedSuggestions = [
    {
      label: 'Fruits',
      items: [
        { name: 'Apple', value: 'apple' },
        { name: 'Banana', value: 'banana' },
        { name: 'Orange', value: 'orange' },
      ],
    },
    {
      label: 'Vegetables',
      items: [
        { name: 'Carrot', value: 'carrot' },
        { name: 'Broccoli', value: 'broccoli' },
        { name: 'Spinach', value: 'spinach' },
      ],
    },
    {
      label: 'Dairy',
      items: [
        { name: 'Cheese', value: 'cheese' },
        { name: 'Milk', value: 'milk' },
        { name: 'Yogurt', value: 'yogurt' },
      ],
    },
  ];

  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);

  return (
    <div>
      <AutoSuggest
        suggestions={[]}
        groups={groupedSuggestions}
        grouped={true}
        placeholder="Search by category"
        onSelection={setSelected}
      />
      {selected && (
        <p style={{ marginTop: '16px' }}>
          Selected: <strong>{selected.name}</strong>
        </p>
      )}
    </div>
  );
};

// Large List with Virtualization Example
export const VirtualizedList = () => {
  const largeSuggestions = Array.from({ length: 500 }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: `item-${i + 1}`,
  }));

  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);

  return (
    <div>
      <AutoSuggest
        suggestions={largeSuggestions}
        placeholder="Search from 500 items (virtualized)"
        virtualized={true}
        itemHeight={35}
        virtualizationThreshold={50}
        onSelection={setSelected}
      />
      {selected && (
        <p style={{ marginTop: '16px' }}>
          Selected: <strong>{selected.name}</strong>
        </p>
      )}
    </div>
  );
};

// API-Backed Suggestions Example
export const APIBacked = () => {
  const [suggestions, setSuggestions] = useState<
    Array<{ name: string; value: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);

  const handleSearch = (term?: string) => {
    if (!term) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const allResults = [
        { name: 'React', value: 'react' },
        { name: 'ReactDOM', value: 'react-dom' },
        { name: 'React Query', value: 'react-query' },
        { name: 'React Router', value: 'react-router' },
        { name: 'Redux', value: 'redux' },
        { name: 'Remarkable', value: 'remarkable' },
      ];

      const filtered = allResults.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );

      setSuggestions(filtered);
      setLoading(false);
    }, 300);
  };

  return (
    <div>
      <AutoSuggest
        suggestions={suggestions}
        placeholder="Search npm packages"
        onChange={handleSearch}
        onSelection={setSelected}
        showSpinner={loading}
        apiBacked={true}
      />
      {selected && (
        <p style={{ marginTop: '16px' }}>
          Selected: <strong>{selected.name}</strong>
        </p>
      )}
    </div>
  );
};

// Custom Placeholder and Styling Example
export const CustomStyling = () => {
  const suggestions = [
    { name: 'Accessibility', value: 'a11y' },
    { name: 'Animation', value: 'animation' },
    { name: 'Async', value: 'async' },
    { name: 'Buttons', value: 'buttons' },
    { name: 'Cards', value: 'cards' },
  ];

  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);

  return (
    <div>
      <AutoSuggest
        suggestions={suggestions}
        placeholder="Find components starting with A, B, or C..."
        onSelection={setSelected}
        size="lg"
        accent="rounded"
        disableIcon={false}
        suggestionsWidth={400}
      />
      {selected && (
        <p style={{ marginTop: '16px' }}>
          Selected: <strong>{selected.name}</strong>
        </p>
      )}
    </div>
  );
};

// RTL Support Example
export const RTLSupport = () => {
  const suggestions = [
    { name: 'مرحبا', value: 'hello-ar' },
    { name: 'مرحبا بك', value: 'welcome-ar' },
    { name: 'شكرا', value: 'thanks-ar' },
  ];

  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);

  return (
    <div>
      <AutoSuggest
        suggestions={suggestions}
        placeholder="ابحث هنا"
        onSelection={setSelected}
        rtl={true}
      />
      {selected && (
        <p style={{ marginTop: '16px' }}>
          Selected: <strong>{selected.name}</strong>
        </p>
      )}
    </div>
  );
};

// Accessibility Example
export const AccessibilityDemo = () => {
  const suggestions = [
    { name: 'Focus visible outline', value: 'focus' },
    { name: 'Keyboard navigation', value: 'keyboard' },
    { name: 'Screen reader support', value: 'screen-reader' },
    { name: 'ARIA labels', value: 'aria' },
  ];

  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);

  return (
    <div>
      <label htmlFor="a11y-demo" style={{ display: 'block', marginBottom: '8px' }}>
        Accessibility Features:
      </label>
      <AutoSuggest
        suggestions={suggestions}
        placeholder="Use arrow keys to navigate, Enter to select, Escape to close"
        onSelection={setSelected}
        aria-label="Accessibility features search"
        aria-labelledby="a11y-demo"
        aria-describedby="a11y-help"
      />
      <div id="a11y-help" style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
        Try keyboard navigation: Arrow Down, Arrow Up, Enter, Escape
      </div>
      {selected && (
        <p style={{ marginTop: '16px' }}>
          Selected: <strong>{selected.name}</strong>
        </p>
      )}
    </div>
  );
};
