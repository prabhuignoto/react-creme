import React from 'react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Avatar } from '../avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('should render avatar with default props', () => {
      const { getByRole } = render(<Avatar />);
      const avatar = getByRole('img');

      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('aria-label', 'User avatar');
    });

    it('should render custom content (children)', () => {
      const { getByText, getByRole } = render(<Avatar>JD</Avatar>);

      expect(getByText('JD')).toBeInTheDocument();
      expect(getByRole('img')).toHaveAttribute('aria-label', 'User avatar');
    });

    it('should render with letter', () => {
      const { getByText, getByRole } = render(<Avatar letter="A" />);

      expect(getByText('A')).toBeInTheDocument();
      expect(getByRole('img')).toHaveAttribute(
        'aria-label',
        'Avatar with initial A'
      );
    });

    it('should prioritize children over letter', () => {
      const { getByText, queryByText } = render(
        <Avatar letter="A">Custom</Avatar>
      );

      expect(getByText('Custom')).toBeInTheDocument();
      expect(queryByText('A')).not.toBeInTheDocument();
    });

    it('should render default icon when no children or letter', () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should render small size (default)', () => {
      const { getByRole } = render(<Avatar />);
      const avatar = getByRole('img');

      expect(avatar.className).toContain('sm');
    });

    it('should render medium size', () => {
      const { getByRole } = render(<Avatar size="md" />);
      const avatar = getByRole('img');

      expect(avatar.className).toContain('md');
    });

    it('should render large size', () => {
      const { getByRole } = render(<Avatar size="lg" />);
      const avatar = getByRole('img');

      expect(avatar.className).toContain('lg');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom background color', () => {
      const { getByRole } = render(<Avatar bgColor="#ff0000" />);
      const avatar = getByRole('img');

      expect(avatar).toHaveStyle('--avatar-bg-color: #ff0000');
    });

    it('should apply custom text color', () => {
      const { getByRole } = render(<Avatar color="#00ff00" />);
      const avatar = getByRole('img');

      expect(avatar).toHaveStyle('--avatar-color: #00ff00');
    });

    it('should apply both custom colors', () => {
      const { getByRole } = render(
        <Avatar bgColor="#ff0000" color="#00ff00" />
      );
      const avatar = getByRole('img');

      expect(avatar).toHaveStyle('--avatar-bg-color: #ff0000');
      expect(avatar).toHaveStyle('--avatar-color: #00ff00');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations with defaults', async () => {
      const { container } = render(<Avatar />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with letter', async () => {
      const { container } = render(<Avatar letter="J" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom content', async () => {
      const { container } = render(<Avatar>JD</Avatar>);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should use custom aria-label when provided', () => {
      const { getByRole } = render(<Avatar ariaLabel="John Doe" />);

      expect(getByRole('img')).toHaveAttribute('aria-label', 'John Doe');
    });

    it('should use custom alt when provided', () => {
      const { getByRole } = render(<Avatar alt="Profile picture" />);

      expect(getByRole('img')).toHaveAttribute('aria-label', 'Profile picture');
    });

    it('should have role="img"', () => {
      const { getByRole } = render(<Avatar />);

      expect(getByRole('img')).toBeInTheDocument();
    });

    it('should hide content container from screen readers', () => {
      const { container } = render(<Avatar letter="A" />);
      const iconContainer = container.querySelector('[aria-hidden="true"]');

      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('Content Priority', () => {
    it('should show children when all props are provided', () => {
      const { getByText, queryByText } = render(
        <Avatar letter="A">Custom</Avatar>
      );

      expect(getByText('Custom')).toBeInTheDocument();
      expect(queryByText('A')).not.toBeInTheDocument();
    });

    it('should show letter when no children provided', () => {
      const { getByText, container } = render(<Avatar letter="B" />);

      expect(getByText('B')).toBeInTheDocument();
      // Should not show default icon
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('should show default icon when no children or letter', () => {
      const { container } = render(<Avatar />);

      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Component Display Name', () => {
    it('should have correct displayName', () => {
      expect(Avatar.displayName).toBe('Avatar');
    });
  });
});
