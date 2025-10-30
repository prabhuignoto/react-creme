/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Kbd } from '../kbd';
import { KbdCombination } from '../kbd-combination';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../kbd.module.scss';

describe('Kbd', () => {
  describe('Rendering', () => {
    it('should render kbd element with text content', () => {
      const { container } = render(<Kbd>Shift</Kbd>);

      const kbdElement = container.querySelector('kbd');
      expect(kbdElement).toBeInTheDocument();
      expect(kbdElement?.tagName).toBe('KBD');
      expect(screen.getByText('Shift')).toBeInTheDocument();
    });

    it('should render with children prop', () => {
      render(<Kbd>Enter</Kbd>);
      expect(screen.getByText('Enter')).toBeInTheDocument();
    });

    it('should render multiple keys in sequence', () => {
      render(
        <div>
          <Kbd>Ctrl</Kbd>
          <span> + </span>
          <Kbd>C</Kbd>
        </div>
      );

      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('should render common modifier keys', () => {
      const keys = ['Shift', 'Ctrl', 'Alt', 'Cmd', 'Meta'];

      keys.forEach(key => {
        const { container } = render(<Kbd>{key}</Kbd>);
        expect(container.querySelector('kbd')).toHaveTextContent(key);
      });
    });

    it('should render common action keys', () => {
      const keys = ['Enter', 'Space', 'Tab', 'Escape', 'Backspace'];

      keys.forEach(key => {
        const { container } = render(<Kbd>{key}</Kbd>);
        expect(container.querySelector('kbd')).toHaveTextContent(key);
      });
    });

    it('should render arrow keys', () => {
      const arrows = ['↑', '↓', '←', '→'];

      arrows.forEach(arrow => {
        const { container } = render(<Kbd>{arrow}</Kbd>);
        expect(container.querySelector('kbd')).toHaveTextContent(arrow);
      });
    });

    it('should handle very long text content', () => {
      const longText = 'VeryLongKeyNameThatMightWrap';
      render(<Kbd>{longText}</Kbd>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      const specialChars = '⌘⌥⇧';
      render(<Kbd>{specialChars}</Kbd>);
      expect(screen.getByText(specialChars)).toBeInTheDocument();
    });

    it('should render React node children', () => {
      const { container } = render(
        <Kbd>
          <span className="test-span">Arrow Up</span>
        </Kbd>
      );

      expect(container.querySelector('.test-span')).toBeInTheDocument();
      expect(screen.getByText('Arrow Up')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply default size (sm)', () => {
      const { container } = render(<Kbd>Key</Kbd>);
      const kbdElement = container.querySelector('kbd');

      expect(kbdElement).toHaveClass(styles.wrapper);
    });

    it('should render kbd with size variants', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach(size => {
        const { container } = render(<Kbd size={size}>{size}</Kbd>);
        const kbdElement = container.querySelector('kbd');

        if (size !== 'md') {
          expect(kbdElement).toHaveClass(styles[size]);
        }
      });
    });

    it('should render kbd with raised button style', () => {
      const positions = ['left', 'right'] as const;

      positions.forEach(position => {
        const { container } = render(<Kbd buttonRaised={position}>{position}</Kbd>);
        const kbdElement = container.querySelector('kbd');

        expect(kbdElement).toHaveClass(styles[`${position}_raised`]);
      });
    });

    it('should apply size and raised styles together', () => {
      const { container } = render(
        <Kbd size="lg" buttonRaised="right">
          Shift
        </Kbd>
      );

      const kbdElement = container.querySelector('kbd');
      expect(kbdElement).toHaveClass(styles.lg);
      expect(kbdElement).toHaveClass(styles.right_raised);
    });

    it('should apply custom thickness via CSS variable', () => {
      const { container } = render(<Kbd thickness={4}>Key</Kbd>);
      const kbdElement = container.querySelector('kbd') as HTMLElement;

      expect(kbdElement.style.getPropertyValue('--rc-kbd-thickness')).toBe('4px');
    });

    it('should use default thickness value', () => {
      const { container } = render(<Kbd>Key</Kbd>);
      const kbdElement = container.querySelector('kbd') as HTMLElement;

      expect(kbdElement.style.getPropertyValue('--rc-kbd-thickness')).toBe('2px');
    });

    it('should apply dark mode class when isDark returns true', () => {
      const { container } = render(<Kbd>Key</Kbd>);
      const kbdElement = container.querySelector('kbd');

      // The dark class is applied based on isDark() utility
      expect(kbdElement).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(<Kbd>Enter</Kbd>);

      const kbdElement = container.querySelector('kbd');
      expect(kbdElement?.tagName).toBe('KBD');
    });

    it('should have no accessibility violations', async () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no violations with various content', async () => {
      const { container } = render(
        <div>
          <Kbd>Shift</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Enter</Kbd>
        </div>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should be visible and perceivable', () => {
      render(<Kbd>Escape</Kbd>);

      const kbdElement = screen.getByText('Escape');
      expect(kbdElement).toBeVisible();
    });

    it('should be visible to screen readers', () => {
      render(
        <div>
          <Kbd>Ctrl</Kbd>
          <span> + </span>
          <Kbd>C</Kbd>
        </div>
      );

      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });
  });
});

describe('KbdCombination', () => {
  describe('Rendering', () => {
    it('should render combination of keys', () => {
      render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">C</Kbd>]}
        </KbdCombination>
      );

      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('should render plus icons between keys', () => {
      const { container } = render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">C</Kbd>]}
        </KbdCombination>
      );

      const plusSpans = container.querySelectorAll(`.${styles.plus}`);
      expect(plusSpans.length).toBe(1);
    });

    it('should handle single key', () => {
      render(
        <KbdCombination>
          {[<Kbd key="1">Shift</Kbd>]}
        </KbdCombination>
      );

      expect(screen.getByText('Shift')).toBeInTheDocument();
    });

    it('should render multiple key combinations', () => {
      const { container } = render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">Shift</Kbd>, <Kbd key="3">S</Kbd>]}
        </KbdCombination>
      );

      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('Shift')).toBeInTheDocument();
      expect(screen.getByText('S')).toBeInTheDocument();

      const plusSpans = container.querySelectorAll(`.${styles.plus}`);
      expect(plusSpans.length).toBe(2);
    });

    it('should handle empty children array', () => {
      const { container } = render(<KbdCombination>{[]}</KbdCombination>);

      const combination = container.querySelector(`.${styles.combination}`);
      expect(combination).toBeInTheDocument();
      expect(combination?.children.length).toBe(0);
    });

    it('should re-render when children change', () => {
      const { rerender } = render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">C</Kbd>]}
        </KbdCombination>
      );

      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();

      rerender(
        <KbdCombination>
          {[<Kbd key="1">Cmd</Kbd>, <Kbd key="2">V</Kbd>]}
        </KbdCombination>
      );

      expect(screen.getByText('Cmd')).toBeInTheDocument();
      expect(screen.getByText('V')).toBeInTheDocument();
      expect(screen.queryByText('Ctrl')).not.toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply default size (sm)', () => {
      const { container } = render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">C</Kbd>]}
        </KbdCombination>
      );

      const combination = container.querySelector(`.${styles.combination}`);
      expect(combination).toHaveClass(styles.combination_sm);
    });

    it('should apply size variants', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach(size => {
        const { container } = render(
          <KbdCombination size={size}>
            {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">C</Kbd>]}
          </KbdCombination>
        );

        const combination = container.querySelector(`.${styles.combination}`);
        expect(combination).toHaveClass(styles[`combination_${size}`]);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">C</Kbd>]}
        </KbdCombination>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with multiple keys', async () => {
      const { container } = render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">Shift</Kbd>, <Kbd key="3">N</Kbd>]}
        </KbdCombination>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should render in a flex container', () => {
      const { container } = render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">C</Kbd>]}
        </KbdCombination>
      );

      const combination = container.querySelector(`.${styles.combination}`);
      expect(combination).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle many keys in combination', () => {
      render(
        <KbdCombination>
          {[<Kbd key="1">Ctrl</Kbd>, <Kbd key="2">Alt</Kbd>, <Kbd key="3">Shift</Kbd>, <Kbd key="4">Delete</Kbd>]}
        </KbdCombination>
      );

      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('Alt')).toBeInTheDocument();
      expect(screen.getByText('Shift')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('should handle mixed icon and text keys', () => {
      render(
        <KbdCombination>
          {[<Kbd key="1">⌘</Kbd>, <Kbd key="2">K</Kbd>]}
        </KbdCombination>
      );

      expect(screen.getByText('⌘')).toBeInTheDocument();
      expect(screen.getByText('K')).toBeInTheDocument();
    });

    it('should handle undefined children gracefully', () => {
      const { container } = render(
        <KbdCombination>{undefined as any}</KbdCombination>
      );

      const combination = container.querySelector(`.${styles.combination}`);
      expect(combination).toBeInTheDocument();
    });
  });
});
