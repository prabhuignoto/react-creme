/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Drawer } from '../drawer';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../drawer.module.scss';

describe('Drawer', () => {
  it('should render the drawer', () => {
    const { getByRole, getByText } = render(
      <Drawer width={400}>
        <span>content</span>
      </Drawer>
    );

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('dialog')).toHaveStyle('--min-width: 400px');
    expect(getByRole('dialog')).toHaveClass(
      styles.visible,
      styles.slide_left_enter
    );
    expect(getByText('content')).toBeInTheDocument();
  });

  it('should render the drawer from right', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="right">
        <span>content</span>
      </Drawer>,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getByRole('dialog')).toBeInTheDocument();
      expect(getByRole('dialog')).toHaveClass(
        styles.visible,
        styles.slide_right_enter
      );
    });
  });

  it('should render the drawer from bottom', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="bottom">
        <span>content</span>
      </Drawer>
    );

    await waitFor(() => {
      expect(getByRole('dialog')).toHaveClass(
        styles.visible,
        styles.slide_bottom_enter
      );
    });
  });

  it('should render the drawer from top', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="top">
        <span>content</span>
      </Drawer>
    );

    expect(getByRole('dialog')).toHaveClass(
      styles.visible,
      styles.slide_top_enter
    );
  });

  it('should close the drawer', async () => {
    const { queryByRole, getByRole } = render(
      <Drawer>
        <span>content</span>
      </Drawer>
    );

    fireEvent.keyUp(getByRole('dialog'), {
      key: 'Escape',
      keyCode: 'Escape',
    });

    await waitFor(
      async () => {
        expect(queryByRole('dialog')).not.toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );
  });

  it('should drawer container have focus on load for better accessibility', async () => {
    const { getByRole } = render(
      <Drawer>
        <span>content</span>
      </Drawer>
    );

    await waitFor(() => {
      // Drawer container should have focus (WCAG 2.4.3 - prevents accidental close)
      expect(getByRole('dialog')).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Drawer />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
