import React from 'react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { PageHeader } from '../page-header';

describe('PageHeader', () => {
  it('should render', () => {
    const { getByText } = render(<PageHeader title="Tests" />);
    expect(getByText('Tests')).toBeInTheDocument();
  });

  it('should render the children', () => {
    const { getByText } = render(<PageHeader title="Tests">Test</PageHeader>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<PageHeader title="Page Title" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
