import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Accordion } from '../accordion';
import headerStyles from '../accordion-header.module.scss';
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
      <Accordion>
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('heading'));

    await waitFor(() => {
      expect(container.firstChild).toHaveClass(styles.open);
    });
  });

  it('should call onExpanded', async () => {
    const onExpanded = vi.fn();

    const { getByRole } = render(
      <Accordion onExpanded={onExpanded}>
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('heading'));

    expect(onExpanded).toHaveBeenCalled();
  });

  it('should call onCollapsed', async () => {
    const onCollapsed = vi.fn();

    const { getByRole } = render(
      <Accordion expanded onCollapsed={onCollapsed}>
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('heading'));

    expect(onCollapsed).toHaveBeenCalled();
  });

  it('should render custom sizes', async () => {
    const { getByRole } = render(
      <Accordion size="sm">
        <p>this is a test</p>
      </Accordion>
    );

    expect(getByRole('img')).toHaveClass(headerStyles['icon-sm']);
  });

  it('should not collapse when disableCollapse is true', async () => {
    const { getByRole, container } = render(
      <Accordion disableCollapse>
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('heading'));

    await waitFor(() => {
      expect(container.firstChild).not.toHaveClass(styles.open);
    });
  });

  it('should not render icon when disableIcon is true', () => {
    const { getByRole } = render(
      <Accordion disableIcon>
        <p>this is a test</p>
      </Accordion>
    );

    expect(getByRole('heading').querySelector('img')).toBeNull();
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
      const { container } = render(<Accordion />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
