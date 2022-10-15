import { render, waitFor } from '@testing-library/react';
import { ReadMore } from '../read-more';
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
});
