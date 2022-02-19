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

    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(4);
    });
  });

  it('Should delete a Tag', async () => {
    const { getByText, getByRole, queryByText } = render(<Tags items={tags} />);

    const one = getByText('one');
    const oneParent = one.parentElement;

    if (oneParent) {
      const closeIcon = oneParent.querySelector('.rc-tag-icon');

      if (closeIcon) {
        fireEvent.click(closeIcon);
      }

      await waitFor(() => {
        expect(getByRole('list').querySelectorAll('li').length).toEqual(3);
        expect(queryByText('one')).not.toBeInTheDocument();
      });
    }
  });

  it('Should call on change', async () => {
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
      expect(handler).toBeCalledWith(['one', 'two', 'three', 'test']);
    });
  });

  it('Should not allow creation of empty tags', async () => {
    const { getByPlaceholderText, getAllByRole, container } = render(
      <Tags items={tags} placeholder="Please enter a value ..." />
    );

    const input = getByPlaceholderText('Please enter a value ...');
    expect(input).toBeInTheDocument();

    expect(container.querySelectorAll('.rc-tag')).toHaveLength(3);

    fireEvent.change(input, {
      target: {
        value: ' ',
      },
    });

    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    await waitFor(() => {
      expect(container.querySelectorAll('.rc-tag')).toHaveLength(3);
    });
  });

  it('should render custom sized tag', () => {
    const { container } = render(<Tags items={tags} size="md" />);

    expect(container.querySelectorAll('.rc-tag-md')).toHaveLength(3);
  });

  it('should not exceed max tags', async () => {
    const { queryByPlaceholderText, container } = render(
      <Tags items={tags} placeholder="Please enter a value ..." maxTags={3} />
    );

    expect(container.querySelectorAll('.rc-tag')).toHaveLength(3);

    const input = queryByPlaceholderText('Please enter a value ...');
    expect(input).not.toBeInTheDocument();
  });

  it('should not exceed max tags - after input entry', async () => {
    const { getByPlaceholderText, container, queryByPlaceholderText } = render(
      <Tags items={tags} placeholder="Please enter a value ..." maxTags={4} />
    );

    const input = getByPlaceholderText('Please enter a value ...');
    expect(container.querySelectorAll('.rc-tag')).toHaveLength(3);

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
      expect(container.querySelectorAll('.rc-tag')).toHaveLength(4);
      expect(input).not.toBeVisible();
    });
  });
});
