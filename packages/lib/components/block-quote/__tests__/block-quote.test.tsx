import { render, screen } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';
import { BlockQuote } from '../block-quote';

// Mock the CSS module
vi.mock('../block-quote.module.scss', () => ({
  default: {
    cite: 'cite',
    content: 'content',
    dark: 'dark',
    quote: 'quote',
    quote_center: 'quote_center',
    quote_default: 'quote_default',
    quote_fancy: 'quote_fancy',
    quote_left: 'quote_left',
    quote_right: 'quote_right',
    quote_simple: 'quote_simple',
  },
}));

// Create a mock for isDark
const isDarkMock = vi.fn();

// Mock the common/utils module
vi.mock('../../common/utils', () => ({
  isDark: () => isDarkMock(),
}));

describe('BlockQuote', () => {
  beforeEach(() => {
    // Reset the mock before each test
    isDarkMock.mockReset();
    // Default to light mode
    isDarkMock.mockReturnValue(false);
  });

  it('renders children content', () => {
    render(
      <BlockQuote>
        <p>Test quote content</p>
      </BlockQuote>
    );
    expect(screen.getByText('Test quote content')).toBeInTheDocument();
  });

  it('renders with citation when provided', () => {
    render(
      <BlockQuote cite="John Doe">
        <p>Test quote content</p>
      </BlockQuote>
    );
    expect(screen.getByText('Test quote content')).toBeInTheDocument();
    expect(screen.getByText('— John Doe')).toBeInTheDocument();
  });

  it('renders with left alignment by default', () => {
    const { container } = render(
      <BlockQuote>
        <p>Test quote content</p>
      </BlockQuote>
    );
    const blockquote = container.firstChild;
    expect(blockquote).toHaveClass('quote_left');
    expect(blockquote).not.toHaveClass('quote_center');
    expect(blockquote).not.toHaveClass('quote_right');
  });

  it('renders with specified alignment', () => {
    const { container, rerender } = render(
      <BlockQuote align="center">
        <p>Test quote content</p>
      </BlockQuote>
    );
    let blockquote = container.firstChild;
    expect(blockquote).toHaveClass('quote_center');

    rerender(
      <BlockQuote align="right">
        <p>Test quote content</p>
      </BlockQuote>
    );
    blockquote = container.firstChild;
    expect(blockquote).toHaveClass('quote_right');
  });

  it('renders with specified style', () => {
    const { container, rerender } = render(
      <BlockQuote style="simple">
        <p>Test quote content</p>
      </BlockQuote>
    );
    let blockquote = container.firstChild;
    expect(blockquote).toHaveClass('quote_simple');

    rerender(
      <BlockQuote style="fancy">
        <p>Test quote content</p>
      </BlockQuote>
    );
    blockquote = container.firstChild;
    expect(blockquote).toHaveClass('quote_fancy');
  });

  it('applies dark theme class in dark mode', () => {
    // Set isDark to return true for this specific test
    isDarkMock.mockReturnValue(true);

    const { container } = render(
      <BlockQuote>
        <p>Test quote content</p>
      </BlockQuote>
    );
    const blockquote = container.firstChild;
    expect(blockquote).toHaveClass('dark');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <BlockQuote className="custom-class">
        <p>Test quote content</p>
      </BlockQuote>
    );
    const blockquote = container.firstChild;
    expect(blockquote).toHaveClass('custom-class');
  });

  it('passes additional props to the blockquote element', () => {
    render(
      <BlockQuote data-testid="custom-testid">
        <p>Test quote content</p>
      </BlockQuote>
    );
    expect(screen.getByTestId('custom-testid')).toBeInTheDocument();
  });
});
