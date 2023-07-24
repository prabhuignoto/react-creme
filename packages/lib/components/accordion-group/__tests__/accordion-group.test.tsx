import {
  findByText,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { AccordionGroup } from '../accordion-group';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('AccordionGroup', () => {
  it('renders children', async () => {
    const { getByText } = render(
      <AccordionGroup expanded titles={['title 1', 'title 2']}>
        <div>Content 1</div>
        <div>Content 2</div>
      </AccordionGroup>
    );

    await expect(getByText('Content 1')).toBeInTheDocument();
    await expect(getByText('Content 2')).toBeInTheDocument();
  });

  it('expands accordion when clicked', async () => {
    render(
      <AccordionGroup titles={['Title 1', 'Title 2']}>
        <div>Content 1</div>
        <div>Content 2</div>
      </AccordionGroup>
    );

    const title1 = screen.getByText('Title 1');
    userEvent.click(title1);

    expect(await screen.findByText('Content 1')).toBeVisible();
  });

  it('only one accordion expanded at a time if autoClose', async () => {
    const { getByText } = render(
      <AccordionGroup autoClose titles={['Title 1', 'Title 2']}>
        <div>Content 1</div>
        <div>Content 2</div>
      </AccordionGroup>
    );

    const title1 = getByText('Title 1');
    const title2 = getByText('Title 2');

    fireEvent.click(title1);
    await waitFor(
      () => {
        expect(getByText('Content 1')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    fireEvent.click(title2);
    await waitFor(
      () => {
        expect(getByText('Content 2')).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });

  it('multiple accordions stay open if no autoClose', async () => {
    const { getByText } = render(
      <AccordionGroup titles={['Title 1', 'Title 2']}>
        <div>Content 1</div>
        <div>Content 2</div>
      </AccordionGroup>
    );

    const title1 = getByText('Title 1');
    const title2 = getByText('Title 2');

    fireEvent.click(title1);

    await waitFor(
      () => {
        expect(getByText('Content 1')).toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );

    fireEvent.click(title2);

    await waitFor(
      () => {
        expect(getByText('Content 2')).toBeInTheDocument();
        expect(getByText('Content 1')).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });
});
