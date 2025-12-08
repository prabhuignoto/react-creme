import React from 'react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReadMore } from '../read-more';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../read-more.module.scss';

const LoremIpsumText = () => (
  <>
    {`It is a long established fact that a reader will be distracted by the
    readable content of a page when looking at its layout. The point of using
    Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
    opposed to using 'Content here, content here', making it look like readable
    English. Many desktop publishing packages and web page editors now use Lorem
    Ipsum as their default model text, and a search for 'lorem ipsum' will
    uncover many web sites still in their infancy. Various versions have evolved
    over the years, sometimes by accident, sometimes on purpose (injected humour
    and the like).`}
  </>
);

describe('Read More', () => {
  it('should render', () => {
    const { getByRole } = render(
      <ReadMore linesToShow={4}>
        <LoremIpsumText />
      </ReadMore>
    );

    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('Read more');
  });

  it("should render 'Show less' when clicked", async () => {
    const { getByRole } = render(
      <ReadMore linesToShow={4}>
        <LoremIpsumText />
      </ReadMore>
    );

    const button = getByRole('button');
    button.click();

    await waitFor(() => {
      expect(button).toHaveTextContent('Show less');
    });

    button.click();

    await waitFor(() => {
      expect(button).toHaveTextContent('Read more');
    });
  });

  it('should render custom sizes', () => {
    const { getByRole } = render(
      <ReadMore linesToShow={4} size="lg">
        <LoremIpsumText />
      </ReadMore>
    );

    expect(getByRole('button')).toHaveClass(styles.lg);
  });

  it("should render RTL when 'RTL' prop is true", async () => {
    const { container } = render(
      <ReadMore linesToShow={4} RTL>
        <LoremIpsumText />
      </ReadMore>
    );

    await waitFor(() => {
      expect(container.firstChild).toHaveClass(styles.rtl);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ReadMore linesToShow={4}>
          <LoremIpsumText />
        </ReadMore>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have aria-expanded attribute', () => {
      const { getByRole } = render(
        <ReadMore linesToShow={4}>
          <LoremIpsumText />
        </ReadMore>
      );

      const button = getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update aria-expanded when toggled', async () => {
      const { getByRole } = render(
        <ReadMore linesToShow={4}>
          <LoremIpsumText />
        </ReadMore>
      );

      const button = getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      button.click();

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });

      button.click();

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should have aria-controls referencing content', () => {
      const { getByRole, container } = render(
        <ReadMore linesToShow={4}>
          <LoremIpsumText />
        </ReadMore>
      );

      const button = getByRole('button');
      const contentId = button.getAttribute('aria-controls');

      expect(contentId).toBeTruthy();
      expect(container.querySelector(`#${contentId}`)).toBeInTheDocument();
    });

    it('should be keyboard accessible via Enter key', async () => {
      const user = userEvent.setup();
      const { getByRole } = render(
        <ReadMore linesToShow={4}>
          <LoremIpsumText />
        </ReadMore>
      );

      const button = getByRole('button');
      expect(button).toHaveTextContent('Read more');

      button.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(button).toHaveTextContent('Show less');
      });
    });

    it('should be keyboard accessible via Space key', async () => {
      const user = userEvent.setup();
      const { getByRole } = render(
        <ReadMore linesToShow={4}>
          <LoremIpsumText />
        </ReadMore>
      );

      const button = getByRole('button');
      expect(button).toHaveTextContent('Read more');

      button.focus();
      await user.keyboard(' ');

      await waitFor(() => {
        expect(button).toHaveTextContent('Show less');
      });
    });
  });
});
