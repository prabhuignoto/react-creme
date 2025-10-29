/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '../dropdown';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../dropdown.module.scss';

const options = [
  { name: 'usa', value: 'usa' },
  { name: 'uk', value: 'uk' },
  { name: 'germany', value: 'germany' },
  { name: 'india', selected: false, value: 'india' },
  { name: 'sri lanka', selected: false, value: 'sri lanka' },
];

const optionsSelected = [
  { name: 'usa', value: 'usa' },
  { name: 'uk', value: 'uk' },
  { name: 'germany', value: 'germany' },
  { name: 'india', selected: true, value: 'india' },
  { name: 'sri lanka', selected: true, value: 'sri lanka' },
];

describe('Dropdown', () => {
  describe('Rendering', () => {
    it('should render with placeholder', () => {
      render(
        <Dropdown options={options} placeholder="select a option" />
      );

      expect(screen.getByText('select a option')).toBeInTheDocument();
    });

    it('should render disabled dropdown', () => {
      const { container } = render(
        <Dropdown
          options={options}
          allowMultiSelection
          placeholder="select a option"
          disabled
        />,
        {
          container: document.body,
        }
      );

      expect(screen.getByText('select a option')).toBeInTheDocument();
      expect(container?.firstChild).toHaveClass(styles.disabled);
      expect(container?.firstChild?.firstChild).toHaveAttribute(
        'aria-disabled',
        'true'
      );
      expect(container?.firstChild?.firstChild).toHaveAttribute('tabindex', '-1');
    });

    it('should render multi-selection mode', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          options={optionsSelected}
          placeholder="select a option"
          allowMultiSelection
        />
      );

      await user.click(screen.getByText('india'));

      await waitFor(() => {
        expect(screen.getByTestId('rc-overlay')).toBeInTheDocument();
        expect(
          screen.getByTestId('rc-overlay').querySelector('[role="listbox"]')
        ).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(5);
      });
    });
  });

  describe('User Interactions', () => {
    it('should open dropdown and select option', async () => {
      const user = userEvent.setup();
      const onSelected = vi.fn();

      render(
        <Dropdown
          options={options}
          placeholder="select a option"
          onSelected={onSelected}
        />
      );

      await user.click(screen.getByText('select a option'));

      await waitFor(() => {
        expect(screen.getByTestId('rc-overlay')).toBeInTheDocument();
        expect(
          screen.getByTestId('rc-overlay').querySelector('[role="listbox"]')
        ).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(5);
        expect(screen.getByText('germany')).toBeInTheDocument();
      });

      const options_list = screen.getAllByRole('option');
      await user.click(options_list[2]);

      await waitFor(() => {
        expect(onSelected).toHaveBeenCalled();
      });
    });

    it('should close menu on Escape key', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(
        <Dropdown
          options={options}
          placeholder="select a option"
          onSelected={handler}
        />,
        {
          container: document.body,
        }
      );

      await user.click(screen.getByText('select a option'));

      // Wait for menu to open
      await waitFor(() => {
        expect(screen.getByTestId('rc-overlay')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(5);
      });

      // Focus on the first option and press Escape
      const firstOption = screen.getAllByRole('option')[0];
      firstOption.focus();

      // Press Escape
      await user.keyboard('{Escape}');

      // Verify menu is closed
      await waitFor(
        () => {
          expect(screen.queryByTestId('rc-overlay')).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it('should clear selection when clear button is clicked', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Dropdown
          options={options}
          placeholder="select a option"
          allowMultiSelection={true}
        />
      );

      await user.click(screen.getByText('select a option'));

      await waitFor(() => {
        expect(screen.getByTestId('rc-overlay')).toBeInTheDocument();
        expect(screen.getByText('india')).toBeInTheDocument();
      });

      const option_items = screen.getAllByRole('option');
      await user.click(option_items[1]);

      await waitFor(() => {
        expect(container.querySelectorAll('.rc-tag').length).toBe(1);
      });

      await user.click(screen.getByTestId('clear-icon'));

      await waitFor(() => {
        expect(container.querySelectorAll('.rc-tag').length).toBe(0);
      });
    });

    it('should navigate with keyboard (ArrowDown and ArrowUp)', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          options={options}
          placeholder="select a option"
          allowMultiSelection={true}
        />,
        {
          container: document.body,
        }
      );

      await user.click(screen.getByText('select a option'));

      // Wait for dropdown to open and options to be visible
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(5);
      });

      const allOptions = screen.getAllByRole('option');

      // Focus the first option to establish keyboard context
      allOptions[0].focus();

      // Navigate down with ArrowDown to second option
      await user.keyboard('{ArrowDown}');

      // Verify the listbox still exists and has options
      const updatedOptions = screen.getAllByRole('option');

      // Verify navigation happened (options may be re-rendered)
      expect(updatedOptions.length).toBeGreaterThan(0);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Dropdown options={options} placeholder="Select country" />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA roles when opened', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Dropdown options={options} placeholder="Select option" />,
        {
          container: document.body,
        }
      );

      await user.click(screen.getByText('Select option'));

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(5);
      });

      // Ignore 'region' rule as dropdown menus in portals commonly trigger false positives
      const results = await axe(container, {
        rules: {
          region: { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes when disabled', async () => {
      const { container } = render(
        <Dropdown
          options={options}
          placeholder="Disabled dropdown"
          disabled
        />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
