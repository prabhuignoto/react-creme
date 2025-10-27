/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../card';

describe('Card', () => {
  describe('Rendering', () => {
    it('should render a basic card with default props', () => {
      const { container } = render(<Card />);
      const card = container.firstChild as HTMLElement;

      expect(card).toBeInTheDocument();
      expect(card).toHaveStyle('--height: 200px');
    });

    it('should render header and footer', () => {
      const { getByText } = render(
        <Card header={<span>header</span>} footer={<span>footer</span>}>
          <div>body content</div>
        </Card>
      );

      expect(getByText('header')).toBeInTheDocument();
      expect(getByText('footer')).toBeInTheDocument();
      expect(getByText('body content')).toBeInTheDocument();
    });

    it('should render with custom height', () => {
      const { container } = render(<Card height={300} />);
      const card = container.firstChild;

      expect(card).toHaveStyle('--height: 300px');
    });

    it('should render children correctly', () => {
      const { getByText } = render(
        <Card>
          <div>Child Node 1</div>
          <div>Child Node 2</div>
        </Card>
      );

      expect(getByText('Child Node 1')).toBeInTheDocument();
      expect(getByText('Child Node 2')).toBeInTheDocument();
    });

    it('should render with custom aria-label', () => {
      const { container } = render(<Card ariaLabel="Product card" />);
      const card = container.firstChild;

      expect(card).toHaveAttribute('aria-label', 'Product card');
      expect(card).toHaveAttribute('role', 'region');
    });

    it('should not have role or aria-label when ariaLabel is not provided', () => {
      const { container } = render(<Card />);
      const card = container.firstChild;

      expect(card).not.toHaveAttribute('role');
      expect(card).not.toHaveAttribute('aria-label');
    });
  });

  describe('Border and Shadow', () => {
    it('should render without border when border=false', () => {
      const { container } = render(<Card border={false} />);
      const card = container.firstChild as HTMLElement;

      expect(card.className).toContain('border_less');
    });

    it('should render with border when border=true', () => {
      const { container } = render(<Card border={true} />);
      const card = container.firstChild as HTMLElement;

      expect(card.className).not.toContain('border_less');
    });

    it('should render with shadow by default', () => {
      const { container } = render(<Card />);
      const card = container.firstChild as HTMLElement;

      expect(card.className).toContain('shadow');
    });

    it('should render without shadow when shadow=false', () => {
      const { container } = render(<Card shadow={false} />);
      const card = container.firstChild as HTMLElement;

      expect(card.className).not.toContain('shadow');
    });
  });

  describe('Alignment', () => {
    it('should align header to the right', () => {
      const { container } = render(
        <Card alignHeader="right" header={<span>header</span>} />
      );
      const header = container.querySelector('[role="heading"]');

      expect(header?.className).toContain('align_right');
    });

    it('should align header to the center', () => {
      const { container } = render(
        <Card alignHeader="center" header={<span>header</span>} />
      );
      const header = container.querySelector('[role="heading"]');

      expect(header?.className).toContain('align_center');
    });

    it('should align footer to the center', () => {
      const { container, getByText } = render(
        <Card alignFooter="center" footer={<span>footer text</span>} />
      );
      const footerText = getByText('footer text');
      const footer = footerText.parentElement;

      expect(footer?.className).toContain('align_center');
    });

    it('should align footer to the right', () => {
      const { container, getByText } = render(
        <Card alignFooter="right" footer={<span>footer text</span>} />
      );
      const footerText = getByText('footer text');
      const footer = footerText.parentElement;

      expect(footer?.className).toContain('align_right');
    });

    it('should have left alignment by default', () => {
      const { container, getByText } = render(
        <Card
          header={<span>header text</span>}
          footer={<span>footer text</span>}
        />
      );
      const header = container.querySelector('[role="heading"]');
      const footerText = getByText('footer text');
      const footer = footerText.parentElement;

      expect(header?.className).not.toContain('align_right');
      expect(header?.className).not.toContain('align_center');
      expect(footer?.className).not.toContain('align_right');
      expect(footer?.className).not.toContain('align_center');
    });
  });

  describe('Size Variants', () => {
    it('should render small size', () => {
      const { container } = render(<Card size="sm" />);
      const card = container.firstChild as HTMLElement;

      expect(card.className).toContain('sm');
    });

    it('should render medium size (default)', () => {
      const { container } = render(<Card />);
      const card = container.firstChild as HTMLElement;

      expect(card.className).toContain('md');
    });

    it('should render large size', () => {
      const { container } = render(<Card size="lg" />);
      const card = container.firstChild as HTMLElement;

      expect(card.className).toContain('lg');
    });
  });

  describe('Interactive Cards', () => {
    it('should be clickable when interactive=true', async () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card interactive onClick={handleClick} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card.className).toContain('interactive');
      expect(card).toHaveAttribute('tabIndex', '0');

      await userEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible with Enter key', async () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card interactive onClick={handleClick} />
      );
      const card = container.firstChild as HTMLElement;

      card.focus();
      await userEvent.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible with Space key', async () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card interactive onClick={handleClick} />
      );
      const card = container.firstChild as HTMLElement;

      card.focus();
      await userEvent.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not be clickable when interactive=false', async () => {
      const handleClick = vi.fn();
      const { container } = render(<Card onClick={handleClick} />);
      const card = container.firstChild as HTMLElement;

      expect(card).not.toHaveAttribute('tabIndex');

      await userEvent.click(card);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should render card with only header', () => {
      const { container, getByText } = render(
        <Card header={<span>Only header</span>} />
      );

      expect(getByText('Only header')).toBeInTheDocument();
      expect(container.querySelector('footer')).not.toBeInTheDocument();
    });

    it('should render card with only footer', () => {
      const { container, getByText } = render(
        <Card footer={<span>Only footer</span>} />
      );

      expect(getByText('Only footer')).toBeInTheDocument();
      expect(container.querySelector('header')).not.toBeInTheDocument();
    });

    it('should render card with no content', () => {
      const { container } = render(<Card />);
      const card = container.firstChild;

      expect(card).toBeInTheDocument();
      expect(card).toBeEmptyDOMElement;
    });

    it('should handle very large height values', () => {
      const { container } = render(<Card height={9999} />);
      const card = container.firstChild;

      expect(card).toHaveStyle('--height: 9999px');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations with basic props', async () => {
      const { container } = render(<Card />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all props', async () => {
      const { container } = render(
        <Card
          header={<h2>Card Title</h2>}
          footer={<button>Action</button>}
          ariaLabel="Feature card"
        >
          <p>Card content</p>
        </Card>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when interactive', async () => {
      const { container } = render(
        <Card interactive onClick={() => {}} ariaLabel="Clickable card">
          <p>Click me</p>
        </Card>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should use proper structure with role attributes', () => {
      const { container } = render(
        <Card
          header={<span>Header</span>}
          footer={<span>Footer</span>}
          ariaLabel="Test card"
        >
          <div>Body</div>
        </Card>
      );

      // Card should have role="region" when ariaLabel is provided
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('role', 'region');
      expect(card).toHaveAttribute('aria-label', 'Test card');

      // Header should have role="heading"
      const headerEl = card.querySelector('[role="heading"]');
      expect(headerEl).toBeInTheDocument();
      expect(headerEl).toHaveAttribute('aria-level', '2');
    });
  });

  describe('Component Display Name', () => {
    it('should have correct displayName', () => {
      expect(Card.displayName).toBe('Card');
    });
  });
});
