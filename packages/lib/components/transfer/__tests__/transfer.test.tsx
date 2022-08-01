import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Transfer } from '../transfer';

const handler = vi.fn();

describe('Transfer', () => {
  it.concurrent('should render transfer view', () => {
    const { getAllByRole } = render(
      <Transfer
        list1={['one', 'two', 'five', 'six']}
        list2={['three', 'four', 'seven', 'eight']}
        onChange={handler}
      />
    );

    expect(getAllByRole('listbox')).toHaveLength(2);
  });

  it('should render transfer snapshot', () => {
    const { container } = render(
      <Transfer
        list1={['one', 'two', 'five', 'six']}
        list2={['three', 'four', 'seven', 'eight']}
        onChange={handler}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it.concurrent('should transfer right work as expected', async () => {
    const { getByText, container, getAllByRole } = render(
      <Transfer
        list1={['one', 'two', 'five', 'six']}
        list2={['three', 'four', 'seven', 'eight']}
        onChange={handler}
      />,
      {
        container: document.body,
      }
    );

    const five = getByText('five');
    const six = getByText('six');

    fireEvent.click(five);
    fireEvent.click(six);

    const btnRight = container.querySelector('.transfer-btn.right');

    if (btnRight) {
      // act(() => {
      fireEvent.click(btnRight);
      // });

      await waitFor(
        async () => {
          expect(
            getAllByRole('listbox')[1].querySelectorAll('li')
          ).toHaveLength(7);
        },
        {
          timeout: 2000,
        }
      );
    }
  });

  it.concurrent('should transfer left work as expected', async () => {
    const { getByText, container, getAllByRole } = render(
      <Transfer
        list1={['one', 'two', 'five', 'six']}
        list2={['three', 'four', 'seven', 'eight']}
        onChange={handler}
      />,
      {
        container: document.body,
      }
    );

    const four = getByText('four');
    const eight = getByText('eight');

    fireEvent.click(four);
    fireEvent.click(eight);

    const btnLeft = container.querySelector('.transfer-btn.left');

    if (btnLeft) {
      // act(() => {
      fireEvent.click(btnLeft);
      // });

      await waitFor(
        async () => {
          expect(
            getAllByRole('listbox')[0].querySelectorAll('li')
          ).toHaveLength(7);
        },
        {
          timeout: 2000,
        }
      );
    }
  });

  // it.concurrent("should transfer all to right work as expected", async () => {
  //   const { getAllByRole, container } = render(
  //     <Transfer
  //       list1={["one", "two", "five", "six"]}
  //       list2={["three", "four", "seven", "eight"]}
  //       onChange={handler}
  //     />
  //   );

  //   const all = getAllByRole("listitem")[0].querySelector(
  //     ".rc-checkbox-wrapper"
  //   );

  //   if (all) {
  //     fireEvent.click(all);
  //     const btnRight = container.querySelector(".transfer-btn.right");

  //     if (btnRight) {
  //       act(async () => {
  //         fireEvent.click(btnRight);
  //         await waitFor(
  //           async () => {
  //             expect(
  //               getAllByRole("list")[1].querySelectorAll("li")
  //             ).toHaveLength(9);
  //           },
  //           {
  //             timeout: 1000,
  //           }
  //         );
  //       });
  //     }
  //   }
  // });

  // it.concurrent('should transfer all to left work as expected', async () => {
  //   const { getAllByRole, container } = render(
  //     <Transfer
  //       list1={['one', 'two', 'five', 'six']}
  //       list2={['three', 'four', 'seven', 'eight']}
  //       onChange={handler}
  //     />,
  //     {
  //       container: document.body,
  //     }
  //   );

  //   const all = getAllByRole('listitem')[0].querySelector(
  //     '.rc-checkbox-wrapper'
  //   );

  //   if (all) {
  //     fireEvent.click(all);

  //     const btnLeft = container.querySelector('.transfer-btn.left');

  //     if (btnLeft) {
  //       fireEvent.click(btnLeft);
  //       await waitFor(
  //         async () => {
  //           expect(getAllByRole('list')[0].querySelectorAll('li')).toHaveLength(
  //             9
  //           );
  //         },
  //         {
  //           timeout: 1000,
  //         }
  //       );
  //     }
  //   }
  // });
});
