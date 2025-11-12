import React from 'react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { TabPanel } from '../TabPanel';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../tabs.module.scss';

describe('TabPanel', () => {
  const defaultProps = {
    children: <div>Test Child</div>,
    disabled: false,
    id: '1',
  };

  it('should render without crashing', () => {
    const { container } = render(<TabPanel {...defaultProps} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render the children prop', () => {
    const { getByText } = render(<TabPanel {...defaultProps} />);
    expect(getByText('Test Child')).toBeTruthy();
  });

  it('should have the appropriate ARIA roles and properties', () => {
    const { getByRole } = render(<TabPanel {...defaultProps} />);
    const tabPanel = getByRole('tabpanel');
    expect(tabPanel).toHaveAttribute('id', `rc-tab-panel-${defaultProps.id}`);
    expect(tabPanel).toHaveAttribute(
      'aria-labelledby',
      `rc-tab-${defaultProps.id}`
    );
  });

  it('should add disabled class when disabled prop is true', () => {
    const { getByRole } = render(<TabPanel {...defaultProps} disabled />);
    expect(getByRole('tabpanel')).toHaveClass(styles.disabled);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<TabPanel />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
