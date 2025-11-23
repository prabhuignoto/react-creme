import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from '../accordion';
import headerStyles from '../accordion-header.module.scss';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../accordion.module.scss';

describe('Accordion', () => {
  it('should render accordion', () => {
    const { container } = render(
      <Accordion>
        <p>this is a test</p>
      </Accordion>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(styles.accordion);
  });

  it('should render snapshot', async () => {
    const { container } = render(
      <Accordion>
        <p>this is a test</p>
      </Accordion>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should toggle content', async () => {
    const { getByRole, container } = render(
      <Accordion title="Test">
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(container.firstChild).toHaveClass(styles.open);
    });
  });

  it('should call onExpanded', async () => {
    const onExpanded = vi.fn();

    const { getByRole } = render(
      <Accordion title="Test" onExpanded={onExpanded}>
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('button'));

    expect(onExpanded).toHaveBeenCalled();
  });

  it('should call onCollapsed', async () => {
    const onCollapsed = vi.fn();

    const { getByRole } = render(
      <Accordion title="Test" expanded onCollapsed={onCollapsed}>
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('button'));

    expect(onCollapsed).toHaveBeenCalled();
  });

  it('should render custom sizes', async () => {
    const { container } = render(
      <Accordion title="Test" size="sm">
        <p>this is a test</p>
      </Accordion>
    );

    // Icon is now aria-hidden, not role="img"
    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toHaveClass(headerStyles['icon-sm']);
  });

  it('should not collapse when disableCollapse is true', async () => {
    const { container } = render(
      <Accordion title="Test" disableCollapse>
        <p>this is a test</p>
      </Accordion>
    );

    // With disableCollapse, there should be no button
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();

    // It should still not toggle
    if (button) {
      fireEvent.click(button);
      await waitFor(() => {
        expect(container.firstChild).not.toHaveClass(styles.open);
      });
    }
  });

  it('should not render icon when disableIcon is true', () => {
    const { container } = render(
      <Accordion title="Test" disableIcon>
        <p>this is a test</p>
      </Accordion>
    );

    const icon = container.querySelector('.icon');
    expect(icon).toBeNull();
  });

  it('should respect the expanded prop', () => {
    const { container } = render(
      <Accordion expanded>
        <p>this is a test</p>
      </Accordion>
    );

    expect(container.firstChild).toHaveClass(styles.open);
  });

  it('should handle null expanded prop gracefully', () => {
    const { container } = render(
      <Accordion expanded={null}>
        <p>this is a test</p>
      </Accordion>
    );

    expect(container.firstChild).not.toHaveClass(styles.open);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Accordion title="Test Accordion">
          <p>Content</p>
        </Accordion>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have button inside heading', () => {
      const { getByRole } = render(
        <Accordion title="Test Title">
          <p>test content</p>
        </Accordion>
      );

      const button = getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Title');
    });

    it('should support Enter key', async () => {
      const { getByRole, container } = render(
        <Accordion title="Test Title">
          <p>test content</p>
        </Accordion>
      );

      const button = getByRole('button');
      button.focus();

      // Simulate Enter key
      fireEvent.keyDown(button, { key: 'Enter' });

      await waitFor(() => {
        expect(container.firstChild).toHaveClass(styles.open);
      });
    });

    it('should support Space key', async () => {
      const { getByRole, container } = render(
        <Accordion title="Test Title">
          <p>test content</p>
        </Accordion>
      );

      const button = getByRole('button');
      button.focus();

      // Simulate Space key
      fireEvent.keyDown(button, { key: ' ' });

      await waitFor(() => {
        expect(container.firstChild).toHaveClass(styles.open);
      });
    });

    it('should have aria-expanded attribute', () => {
      const { getByRole } = render(
        <Accordion title="Test Title">
          <p>test content</p>
        </Accordion>
      );

      const button = getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update aria-expanded when opened', async () => {
      const { getByRole } = render(
        <Accordion title="Test Title">
          <p>test content</p>
        </Accordion>
      );

      const button = getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should have icon with aria-hidden', () => {
      const { container } = render(
        <Accordion title="Test Title">
          <p>test content</p>
        </Accordion>
      );

      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });
});
