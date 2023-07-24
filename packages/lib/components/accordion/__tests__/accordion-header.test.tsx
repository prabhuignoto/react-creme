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

    render(<AccordionHeader onToggle={onToggle} />);

    await userEvent.click(screen.getByRole('heading'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('has aria-expanded=true when open', () => {
    render(<AccordionHeader open />);

    expect(screen.getByRole('heading')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });
});
