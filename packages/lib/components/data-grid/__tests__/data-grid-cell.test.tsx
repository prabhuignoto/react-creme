import React from 'react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { DataGridCell } from '../data-grid-cell';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../data-grid.module.scss';

describe('DataGridCell', () => {
  it('should render the data grid cell', async () => {
    const { getByText, container } = render(
      <DataGridCell name="name" value="john" />
    );

    expect(getByText('john')).toBeInTheDocument();

    const cellDiv = container.querySelector(`.${styles.cell}`);
    expect(cellDiv).toBeInTheDocument();
  });

  it('should render with border', async () => {
    const { container } = render(
      <DataGridCell name="name" value="john" border />
    );

    const cellDiv = container.querySelector(`.${styles.cell_border}`);
    expect(cellDiv).toBeInTheDocument();
  });

  it('should render formatted value when formatter is provided', async () => {
    const formatter = (value: string | number) => `Formatted: ${value}`;
    const { getByText } = render(
      <DataGridCell name="name" value="john" formatter={formatter} />
    );

    expect(getByText('Formatted: john')).toBeInTheDocument();
  });

  it('should apply zebra styling', async () => {
    const { container } = render(
      <DataGridCell name="name" value="john" zebra />
    );

    const zebraDiv = container.querySelector(`.${styles.zebra}`);
    expect(zebraDiv).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      // Render with proper table structure for accessibility
      const { container } = render(
        <div role="table">
          <div role="row">
            <div role="cell">
              <DataGridCell name="name" value="john" />
            </div>
          </div>
        </div>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
