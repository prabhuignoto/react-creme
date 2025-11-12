import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it } from 'vitest';
import { Spinner } from '../../spinner/spinner';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../spinner.module.scss';

expect.extend(toHaveNoViolations);

describe('Spinner', () => {
  it('should render spinner', () => {
    const { getByRole } = render(<Spinner />);
    expect(getByRole('img')).toBeInTheDocument();
  });

  it('should render custom size', () => {
    const { getByRole } = render(<Spinner size="sm" />);
    expect(getByRole('img')).toHaveClass(styles.spinner_sm);
  });

  it('should be able to customize the speed', () => {
    const { getByRole } = render(<Spinner speed="fast" />);
    expect(getByRole('img')).toHaveStyle('--rc-spinner-speed: fast');
  });

  it('should render md size', () => {
    const { getByRole } = render(<Spinner size="md" />);
    expect(getByRole('img')).toHaveClass(styles.spinner_md);
  });

  it('should render lg size', () => {
    const { getByRole } = render(<Spinner size="lg" />);
    expect(getByRole('img')).toHaveClass(styles.spinner_lg);
  });

  it('should render medium speed', () => {
    const { getByRole } = render(<Spinner speed="medium" />);
    expect(getByRole('img')).toHaveStyle('--rc-spinner-speed: medium');
  });

  it('should render slow speed', () => {
    const { getByRole } = render(<Spinner speed="slow" />);
    expect(getByRole('img')).toHaveStyle('--rc-spinner-speed: slow');
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Spinner />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have default aria-label', () => {
      const { getByRole } = render(<Spinner />);
      expect(getByRole('img')).toHaveAttribute('aria-label', 'Loading');
    });

    it('should have custom aria-label', () => {
      const { getByRole } = render(<Spinner label="Processing data" />);
      expect(getByRole('img')).toHaveAttribute('aria-label', 'Processing data');
    });

    it('should have role="img"', () => {
      const { getByRole } = render(<Spinner />);
      expect(getByRole('img')).toBeInTheDocument();
    });
  });
});
