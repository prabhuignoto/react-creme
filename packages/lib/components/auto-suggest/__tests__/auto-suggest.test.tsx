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
  });
});
