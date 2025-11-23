import React from 'react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Link } from '../link';

describe('Link', () => {
  it('should render a link', () => {
    const { getByText } = render(
      <Link href="http://www.google.com">Google</Link>
    );
    expect(getByText('Google')).toBeInTheDocument();
  });

  it('should render a link with an icon', () => {
    const { getByText } = render(
      <Link href="http://www.google.com" icon="🔍">
        Google
      </Link>
    );
    expect(getByText('Google')).toBeInTheDocument();
  });

  it('should render a link with an icon and text', () => {
    const { getByText } = render(
      <Link href="http://www.google.com" icon="🔍">
        Google
      </Link>
    );
    expect(getByText('Google')).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Link />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
