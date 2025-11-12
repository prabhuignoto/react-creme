import React from 'react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Text } from '../text';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../text.module.scss';

describe('Text', () => {
  it('should render Text', () => {
    const { getByText } = render(<Text>Text</Text>);
    expect(getByText('Text')).toBeInTheDocument();
  });

  it('should render Text with RTL', () => {
    const { getByText } = render(<Text RTL>Text</Text>);
    expect(getByText('Text')).toHaveClass(styles.RTL);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Text />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
