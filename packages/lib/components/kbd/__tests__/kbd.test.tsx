/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Kbd } from '../kbd';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../kbd.module.scss';

describe('Keyboard', () => {
  it('should render kbd', () => {
    const { getByText } = render(<Kbd>Shift</Kbd>);

    expect(getByText('Shift')).toBeInTheDocument();
  });

  it('should render kbd with size', () => {
    const { getByText } = render(<Kbd size="lg">Shift</Kbd>);

    expect(getByText('Shift')).toHaveClass(styles.lg);
  });

  it('should render kbd with raised button', () => {
    const { getByText } = render(<Kbd buttonRaised="right">Shift</Kbd>);

    expect(getByText('Shift')).toHaveClass(styles.right_raised);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Kbd />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
