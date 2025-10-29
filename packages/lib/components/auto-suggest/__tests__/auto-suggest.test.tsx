/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { AutoSuggest } from '../auto-suggest';

const suggestions = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'sixty six',
].map(item => ({
  name: item,
  value: item,
}));

describe('AutoSuggest', () => {
  describe('Rendering', () => {
    it('should render auto suggest component', () => {
      render(<AutoSuggest suggestions={suggestions} />);
      expect(screen.getByTestId('rc-auto-suggest')).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(
        <AutoSuggest suggestions={suggestions} placeholder="placeholder" />
      );
      expect(screen.getByTestId('rc-auto-suggest')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should show suggestions when typing', async () => {
      const user = userEvent.setup();

      render(
        <AutoSuggest suggestions={suggestions} placeholder="enter input" />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'one');

      await waitFor(
        () => {
          expect(screen.getByTestId('rc-overlay')).toBeInTheDocument();
          expect(
            screen.getByTestId('rc-overlay').querySelectorAll('li')
          ).toHaveLength(1);
        },
        {
          timeout: 2000,
        }
      );
    });

    it('should select item from suggestions', async () => {
      const user = userEvent.setup();

      render(
        <AutoSuggest suggestions={suggestions} placeholder="enter input" />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'one');

      await waitFor(
        () => {
          expect(screen.getByTestId('rc-overlay')).toBeInTheDocument();
        },
        {
          timeout: 2000,
        }
      );

      const items = screen.getByTestId('rc-overlay').querySelectorAll('li');
      await user.click(items[0]);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('enter input')).toHaveValue('one');
      });
    });

    it('should call onChange handler when typing', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <AutoSuggest
          suggestions={suggestions}
          placeholder="enter input"
          onChange={onChange}
        />
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'open');

      await waitFor(
        () => {
          expect(onChange).toHaveBeenCalledWith('open');
        },
        {
          timeout: 2000,
        }
      );
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(
        <AutoSuggest
          suggestions={suggestions}
          placeholder="enter input"
          onChange={handler}
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'six');

      await waitFor(() => {
        expect(screen.getByText('six')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(2);
      });

      // Navigate down
      input.focus();
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getAllByRole('option')[0]).toHaveFocus();
      });

      // Navigate down again
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getAllByRole('option')[1]).toHaveFocus();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <AutoSuggest suggestions={suggestions} placeholder="Search" />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should support keyboard navigation with proper ARIA roles', async () => {
      const user = userEvent.setup();

      render(
        <AutoSuggest suggestions={suggestions} placeholder="enter input" />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'one');

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(1);
      });
    });

    it('should have aria-autocomplete attribute', () => {
      render(<AutoSuggest suggestions={suggestions} placeholder="Search" />);
      const input = screen.getByPlaceholderText('Search');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('should support aria-label prop', () => {
      render(
        <AutoSuggest
          suggestions={suggestions}
          placeholder="Search"
          aria-label="Search suggestions"
        />
      );
      const input = screen.getByPlaceholderText('Search');
      expect(input).toHaveAttribute('aria-label', 'Search suggestions');
    });

    it('should close menu on Escape key', async () => {
      const user = userEvent.setup();

      render(
        <AutoSuggest suggestions={suggestions} placeholder="enter input" />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'one');

      await waitFor(() => {
        expect(screen.getByTestId('rc-overlay')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByTestId('rc-overlay')).not.toBeInTheDocument();
      });
    });
  });

  describe('Multiple Selection', () => {
    it('should support multiple selection when enabled', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <AutoSuggest
          suggestions={suggestions}
          placeholder="enter input"
          multiple={true}
          onSelectionChange={onSelectionChange}
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');

      // Select first item
      await user.type(input, 'one');
      await waitFor(() => {
        expect(screen.getByText('one')).toBeInTheDocument();
      });

      const items = screen.getByTestId('rc-overlay').querySelectorAll('li');
      await user.click(items[0]);

      await waitFor(() => {
        expect(onSelectionChange).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ name: 'one', value: 'one' }),
          ])
        );
      });
    });

    it('should respect maxSelections limit', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <AutoSuggest
          suggestions={suggestions}
          placeholder="enter input"
          multiple={true}
          maxSelections={2}
          onSelectionChange={onSelectionChange}
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');

      // Try to select 3 items
      for (let i = 0; i < 3; i++) {
        await user.clear(input);
        await user.type(input, suggestions[i].name);

        await waitFor(() => {
          expect(screen.getByText(suggestions[i].name)).toBeInTheDocument();
        });

        const items = screen.getByTestId('rc-overlay').querySelectorAll('li');
        await user.click(items[0]);
      }

      // Should only have 2 selections maximum
      await waitFor(() => {
        expect(onSelectionChange).toHaveBeenLastCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ name: suggestions[1].name }),
            expect.objectContaining({ name: suggestions[2].name }),
          ])
        );
      });
    });
  });

  describe('Grouped Suggestions', () => {
    const groupedSuggestions = [
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

    it('should render grouped suggestions', async () => {
      const user = userEvent.setup();

      render(
        <AutoSuggest
          suggestions={[]}
          groups={groupedSuggestions}
          grouped={true}
          placeholder="enter input"
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, '');

      await waitFor(() => {
        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
      });
    });

    it('should filter grouped suggestions by input', async () => {
      const user = userEvent.setup();

      render(
        <AutoSuggest
          suggestions={[]}
          groups={groupedSuggestions}
          grouped={true}
          placeholder="enter input"
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'app');

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.queryByText('Carrot')).not.toBeInTheDocument();
      });
    });

    it('should select grouped suggestion', async () => {
      const user = userEvent.setup();
      const onSelection = vi.fn();

      render(
        <AutoSuggest
          suggestions={[]}
          groups={groupedSuggestions}
          grouped={true}
          placeholder="enter input"
          onSelection={onSelection}
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'app');

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      const items = screen.getByTestId('rc-overlay').querySelectorAll('li');
      const appleItem = Array.from(items).find(
        item => item.textContent === 'Apple'
      );

      if (appleItem) {
        await user.click(appleItem);
      }

      await waitFor(() => {
        expect(onSelection).toHaveBeenCalledWith({
          name: 'Apple',
          value: 'apple',
        });
      });
    });
  });

  describe('Controlled Component', () => {
    it('should update input when value prop changes', async () => {
      const { rerender } = render(
        <AutoSuggest suggestions={suggestions} value="" />
      );

      const input = screen.getByDisplayValue('') as HTMLInputElement;
      expect(input.value).toBe('');

      rerender(<AutoSuggest suggestions={suggestions} value="test" />);
      expect(input.value).toBe('test');
    });

    it('should clear input with enableClear functionality', async () => {
      const user = userEvent.setup();

      render(
        <AutoSuggest suggestions={suggestions} placeholder="enter input" />
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'one');

      expect(input).toHaveValue('one');

      // Clear button should be available through Input component
      // This test verifies the overall integration
      await user.clear(input);
      expect(input).toHaveValue('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty suggestions gracefully', () => {
      render(<AutoSuggest suggestions={[]} placeholder="Search" />);
      expect(screen.getByTestId('rc-auto-suggest')).toBeInTheDocument();
    });

    it('should debounce onChange callback', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <AutoSuggest
          suggestions={suggestions}
          placeholder="enter input"
          onChange={onChange}
          debounce={200}
        />
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'test', { delay: 50 });

      // onChange should not be called yet (debouncing)
      expect(onChange).not.toHaveBeenCalled();

      // Wait for debounce to complete
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });

    it('should handle special characters in search term', async () => {
      const user = userEvent.setup();

      const specialSuggestions = [
        { name: 'test[1]', value: 'test[1]' },
        { name: 'test(2)', value: 'test(2)' },
        { name: 'test.3', value: 'test.3' },
      ];

      render(
        <AutoSuggest
          suggestions={specialSuggestions}
          placeholder="enter input"
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'test[');

      await waitFor(() => {
        expect(screen.getByText('test[1]')).toBeInTheDocument();
        expect(screen.queryByText('test(2)')).not.toBeInTheDocument();
      });
    });

    it('should handle very long suggestion lists', async () => {
      const user = userEvent.setup();

      // Create a large list of suggestions
      const largeSuggestions = Array.from({ length: 200 }, (_, i) => ({
        name: `Suggestion ${i}`,
        value: `suggestion-${i}`,
      }));

      render(
        <AutoSuggest
          suggestions={largeSuggestions}
          placeholder="enter input"
          virtualized={true}
          itemHeight={35}
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'Suggestion 1');

      // Should render virtualized list
      await waitFor(() => {
        expect(screen.getByTestId('rc-overlay')).toBeInTheDocument();
      });
    });

    it('should handle api-backed suggestions', async () => {
      const user = userEvent.setup();

      const mockSuggestions = [
        { name: 'API Result 1', value: 'result1' },
        { name: 'API Result 2', value: 'result2' },
      ];

      render(
        <AutoSuggest
          suggestions={mockSuggestions}
          placeholder="enter input"
          apiBacked={true}
        />,
        {
          container: document.body,
        }
      );

      const input = screen.getByPlaceholderText('enter input');
      await user.type(input, 'any text');

      await waitFor(() => {
        // API-backed should show all suggestions without filtering
        expect(screen.getByText('API Result 1')).toBeInTheDocument();
        expect(screen.getByText('API Result 2')).toBeInTheDocument();
      });
    });
  });

  describe('Display Name', () => {
    it('should have displayName set to AutoSuggest', () => {
      // @ts-ignore - accessing component displayName
      expect(AutoSuggest.displayName).toBe('AutoSuggest');
    });
  });
});
