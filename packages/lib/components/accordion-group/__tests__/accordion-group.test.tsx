import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AccordionGroup } from '../accordion-group';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('AccordionGroup', () => {
  it('renders children', async () => {
    const { getByText } = render(
      <AccordionGroup expanded titles={['title 1', 'title 2']}>
        <div>Content 1</div>
        <div>Content 2</div>
      </AccordionGroup>
    );

    await expect(getByText('Content 1')).toBeInTheDocument();
    await expect(getByText('Content 2')).toBeInTheDocument();
  });

  it('expands accordion when clicked', async () => {
    render(
      <AccordionGroup titles={['Title 1', 'Title 2']}>
        <div>Content 1</div>
        <div>Content 2</div>
      </AccordionGroup>
    );

    const title1 = screen.getByText('Title 1');
    userEvent.click(title1);

    expect(await screen.findByText('Content 1')).toBeVisible();
  });

  it('only one accordion expanded at a time if autoClose', async () => {
    const { getByText } = render(
      <AccordionGroup autoClose titles={['Title 1', 'Title 2']}>
        <div>Content 1</div>
        <div>Content 2</div>
      </AccordionGroup>
    );

    const title1 = getByText('Title 1');
    const title2 = getByText('Title 2');

    fireEvent.click(title1);
    await waitFor(
      () => {
        expect(getByText('Content 1')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    fireEvent.click(title2);
    await waitFor(
      () => {
        expect(getByText('Content 2')).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });

  it('multiple accordions stay open if no autoClose', async () => {
    const { getByText } = render(
      <AccordionGroup titles={['Title 1', 'Title 2']}>
        <div>Content 1</div>
        <div>Content 2</div>
      </AccordionGroup>
    );

    const title1 = getByText('Title 1');
    const title2 = getByText('Title 2');

    fireEvent.click(title1);

    await waitFor(
      () => {
        expect(getByText('Content 1')).toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );

    fireEvent.click(title2);

    await waitFor(
      () => {
        expect(getByText('Content 2')).toBeInTheDocument();
        expect(getByText('Content 1')).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<AccordionGroup />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate to next accordion with ArrowDown', async () => {
      const user = userEvent.setup();
      render(
        <AccordionGroup titles={['Title 1', 'Title 2', 'Title 3']}>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </AccordionGroup>
      );

      const buttons = screen.getAllByRole('button');

      // Focus first accordion
      buttons[0]?.focus();
      expect(document.activeElement).toBe(buttons[0]);

      // Press ArrowDown to navigate to second accordion
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[1]);
      });
    });

    it('should navigate to previous accordion with ArrowUp', async () => {
      const user = userEvent.setup();
      render(
        <AccordionGroup titles={['Title 1', 'Title 2', 'Title 3']}>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </AccordionGroup>
      );

      const buttons = screen.getAllByRole('button');

      // Focus second accordion
      buttons[1]?.focus();
      expect(document.activeElement).toBe(buttons[1]);

      // Press ArrowUp to navigate to first accordion
      await user.keyboard('{ArrowUp}');

      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[0]);
      });
    });

    it('should wrap to first accordion when ArrowDown on last', async () => {
      const user = userEvent.setup();
      render(
        <AccordionGroup titles={['Title 1', 'Title 2', 'Title 3']}>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </AccordionGroup>
      );

      const buttons = screen.getAllByRole('button');

      // Focus last accordion
      buttons[2]?.focus();
      expect(document.activeElement).toBe(buttons[2]);

      // Press ArrowDown to wrap to first accordion
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[0]);
      });
    });

    it('should wrap to last accordion when ArrowUp on first', async () => {
      const user = userEvent.setup();
      render(
        <AccordionGroup titles={['Title 1', 'Title 2', 'Title 3']}>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </AccordionGroup>
      );

      const buttons = screen.getAllByRole('button');

      // Focus first accordion
      buttons[0]?.focus();
      expect(document.activeElement).toBe(buttons[0]);

      // Press ArrowUp to wrap to last accordion
      await user.keyboard('{ArrowUp}');

      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[2]);
      });
    });

    it('should jump to first accordion with Home', async () => {
      const user = userEvent.setup();
      render(
        <AccordionGroup titles={['Title 1', 'Title 2', 'Title 3']}>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </AccordionGroup>
      );

      const buttons = screen.getAllByRole('button');

      // Focus last accordion
      buttons[2]?.focus();
      expect(document.activeElement).toBe(buttons[2]);

      // Press Home to jump to first accordion
      await user.keyboard('{Home}');

      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[0]);
      });
    });

    it('should jump to last accordion with End', async () => {
      const user = userEvent.setup();
      render(
        <AccordionGroup titles={['Title 1', 'Title 2', 'Title 3']}>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </AccordionGroup>
      );

      const buttons = screen.getAllByRole('button');

      // Focus first accordion
      buttons[0]?.focus();
      expect(document.activeElement).toBe(buttons[0]);

      // Press End to jump to last accordion
      await user.keyboard('{End}');

      await waitFor(() => {
        expect(document.activeElement).toBe(buttons[2]);
      });
    });

    it('should toggle accordion with Enter key', async () => {
      const user = userEvent.setup();
      render(
        <AccordionGroup titles={['Title 1', 'Title 2']}>
          <div>Content 1</div>
          <div>Content 2</div>
        </AccordionGroup>
      );

      const buttons = screen.getAllByRole('button');

      // Focus first accordion
      buttons[0]?.focus();

      // Press Enter to expand
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });

      // Press Enter again to collapse
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      });
    });

    it('should support autoClose with keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <AccordionGroup autoClose titles={['Title 1', 'Title 2', 'Title 3']}>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </AccordionGroup>
      );

      const buttons = screen.getAllByRole('button');

      // Focus and expand first accordion
      buttons[0]?.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });

      // Navigate to second accordion and expand it
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByText('Content 2')).toBeVisible();
        // First accordion should be closed due to autoClose
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      });
    });
  });
});
