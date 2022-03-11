import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
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

  it('should render snapshot', () => {
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

    fireEvent.click(getByRole('button'));

    await waitFor(async () => {
      expect(container.firstChild).toHaveClass(styles.open);
    });
  });

  it('should call onExpanded', () => {
    const onExpanded = vi.fn();

    const { getByRole } = render(
      <Accordion onExpanded={onExpanded}>
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('button'));

    expect(onExpanded).toHaveBeenCalled();
  });

  it('should render custom sizes', () => {
    const { getByRole } = render(
      <Accordion size="sm">
        <p>this is a test</p>
      </Accordion>
    );

    expect(getByRole('img')).toHaveClass(headerStyles['icon-sm']);
  });
});
