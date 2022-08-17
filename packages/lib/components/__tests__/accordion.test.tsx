import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Accordion } from '../core/accordion/accordion';
import headerStyles from '../core/accordion/accordion-header.module.scss';
import styles from '../core/accordion/accordion.module.scss';

describe('Accordion', () => {
  it.concurrent('should render accordion', () => {
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

  it.concurrent('should toggle content', async () => {
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

  it.concurrent('should call onExpanded', async () => {
    const onExpanded = vi.fn();

    const { getByRole } = render(
      <Accordion onExpanded={onExpanded}>
        <p>this is a test</p>
      </Accordion>,
      {
        container: document.body,
      }
    );

    fireEvent.click(getByRole('button'));

    expect(onExpanded).toHaveBeenCalled();
  });

  it.concurrent('should render custom sizes', async () => {
    const { getByRole } = render(
      <Accordion size="sm">
        <p>this is a test</p>
      </Accordion>,
      {
        container: document.body,
      }
    );

    expect(getByRole('img')).toHaveClass(headerStyles['icon-sm']);
  });
});
