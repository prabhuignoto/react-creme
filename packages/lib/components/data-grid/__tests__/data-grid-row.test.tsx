import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'jest-axe';
import { DataGridRow } from '../data-grid-row';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../data-grid.module.scss';

describe('DataGridRow', () => {
  it('should render the row with correct data', async () => {
    const { getByText } = render(
      <DataGridRow
        data={{ age: 30, name: 'John' }}
        columnConfigs={[
          { name: 'name', type: 'string' },
          { name: 'age', type: 'number' },
        ]}
      />
    );

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
  });

  it('should apply zebra styling', async () => {
    const { container } = render(
      <DataGridRow
        data={{ name: 'John' }}
        columnConfigs={[{ name: 'name', type: 'string' }]}
        zebra
      />
    );

    expect(container.firstChild).toHaveClass(styles.zebra);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <div role="table">
          <DataGridRow
            data={{ name: 'Test' }}
            columnConfigs={[{ name: 'name', type: 'string' }]}
          />
        </div>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
