/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Kbd } from '../kbd';
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

    it('should render empty kbd when no children', () => {
      const { container } = render(<Kbd />);

      const kbdElement = container.querySelector('kbd');
      expect(kbdElement).toBeInTheDocument();
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
  });

  describe('Styling', () => {
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

      // Verify both keys are rendered and visible
      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });
  });
});
