import React from 'react';
import { axe } from 'jest-axe';
// test.jsamp

import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AccordionHeader } from '../accordion-header';

describe('AccordionHeader', () => {
  it('renders title', () => {
    render(<AccordionHeader title="Test" />);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    const Icon = () => <div data-testid="custom-icon" />;

    render(<AccordionHeader customIcon={<Icon />} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn();

    render(<AccordionHeader onToggle={onToggle} title="Test" />);

    await userEvent.click(screen.getByRole('button'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('has aria-expanded=true when open', () => {
    render(<AccordionHeader open title="Test" />);

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('does not call onToggle when disableCollapse is true', async () => {
    const onToggle = vi.fn();

    render(<AccordionHeader onToggle={onToggle} disableCollapse title="Test" />);

    await userEvent.click(screen.getByRole('button'));

    expect(onToggle).not.toHaveBeenCalled();
  });

  it('does not render icon when disableIcon is true', () => {
    const { container } = render(<AccordionHeader disableIcon title="Test" />);

    // Icon should have disable-icon class (which sets display: none)
    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon?.className).toMatch(/_disable-icon_/);
  });

  it('applies alignIconRight class when alignIconRight is true', () => {
    render(<AccordionHeader alignIconRight title="Test" />);

    const button = screen.getByRole('button');
    expect(button.className).toMatch(/_align-icon-rt_/);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<AccordionHeader title="Test Header" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should render button inside h3 heading', () => {
      const { container } = render(<AccordionHeader title="Test Title" />);

      const heading = container.querySelector('h3');
      expect(heading).toBeInTheDocument();

      const button = heading?.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Title');
    });

    it('should support Enter key', async () => {
      const onToggle = vi.fn();
      const user = userEvent.setup();

      render(<AccordionHeader onToggle={onToggle} title="Test" />);

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('should support Space key', async () => {
      const onToggle = vi.fn();
      const user = userEvent.setup();

      render(<AccordionHeader onToggle={onToggle} title="Test" />);

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard(' ');

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('should have aria-expanded attribute on button', () => {
      render(<AccordionHeader title="Test" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update aria-expanded when open', () => {
      const { rerender } = render(<AccordionHeader title="Test" open={false} />);

      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      rerender(<AccordionHeader title="Test" open={true} />);

      button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have icon with aria-hidden', () => {
      const { container } = render(<AccordionHeader title="Test" />);

      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });
});
