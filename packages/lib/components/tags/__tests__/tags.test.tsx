import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Tags } from '../tags';
import { TagItemProps } from '../tags-model';

const onSelected = vi.fn();

const tags: TagItemProps[] = [
  { name: 'one' },
  { name: 'two' },
  { name: 'three' },
];

const tagsWithDisabled: TagItemProps[] = [
  { name: 'one' },
  { name: 'two', disabled: true },
];

describe('Tags', () => {
  it('Should render default', () => {
    const { getByRole, getAllByRole } = render(<Tags items={tags} />);

    expect(getByRole('list')).toBeInTheDocument();

    expect(getAllByRole('listitem')).toHaveLength(4);
  });

  it('Should render disabled', () => {
    const { getAllByRole } = render(<Tags items={tagsWithDisabled} />);

    expect(getAllByRole('listitem')[1]).toHaveClass('rc-tag-disabled');
  });

  it('Should create new tag', async () => {
    const { getByPlaceholderText, getByRole, getAllByRole } = render(
      <Tags items={tags} placeholder="Please enter a value ..." />
    );
    const input = getByPlaceholderText('Please enter a value ...');

    fireEvent.change(input, {
      target: {
        value: 'new',
      },
    });

    fireEvent.keyUp(input, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(4);
    });
  });

  it('should delete a tag', async () => {
    const { getByText, getByRole } = render(<Tags items={tags} />);

    const one = getByText('one');
    const oneParent = one.parentElement;

    if (oneParent) {
      const closeIcon = oneParent.querySelector('.rc-tag-icon');

      if (closeIcon) {
        fireEvent.click(closeIcon);
      }

      await waitFor(() => {
        expect(getByRole('list').querySelectorAll('li').length).toEqual(3);
      });
    }
  });

  it('should call on change', async () => {
    const handler = vi.fn();
    const { getByPlaceholderText } = render(
      <Tags
        items={tags}
        onChange={handler}
        placeholder="Please enter a value ..."
      />
    );

    const input = getByPlaceholderText('Please enter a value ...');

    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });

    fireEvent.keyUp(input, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    await waitFor(() => {
      expect(handler).toBeCalled();
      // expect(handler).toBeCalledWith(['one', 'two', 'three', 'test']);
    });
  });
});
