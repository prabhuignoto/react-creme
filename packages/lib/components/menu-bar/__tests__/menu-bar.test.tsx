import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, fn, it } from 'vitest';
import { MenuBar } from '../menu-bar';

const items = [
  {
    items: [
      {
        name: 'Open',
      },
      {
        name: 'Save As',
      },
      {
        name: 'Save',
      },
      {
        name: 'Close',
      },
    ],
    name: 'File',
    id: '1',
  },
  {
    items: [
      {
        name: 'Cut',
      },
      {
        name: 'Copy',
      },
      {
        name: 'Paste',
      },
      {
        name: 'Select All',
      },
    ],
    name: 'Edit',
    id: '2',
  },
  {
    items: [
      {
        name: 'About',
      },
      {
        name: 'Version',
      },
    ],
    name: 'Help',
    id: '3',
  },
];

describe('Menu Bar', () => {
  it('should render menu bar items', () => {
    const { getByText } = render(<MenuBar items={items} />);

    expect(getByText('File')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
  });

  it('Should open Menu on click', async () => {
    const { getByText } = render(<MenuBar items={items} />);

    expect(getByText('File')).toBeInTheDocument();

    fireEvent.click(getByText('File'));

    await waitFor(() => {
      expect(getByText('Open')).toBeInTheDocument();
    });

    fireEvent.click(getByText('Help'));

    await waitFor(() => {
      expect(getByText('About')).toBeInTheDocument();
    });
  });

  it('Should close menu when clicked outside', async () => {
    const { getByText, queryByText } = render(<MenuBar items={items} />);

    expect(getByText('File')).toBeInTheDocument();

    fireEvent.click(getByText('File'));

    await waitFor(() => {
      expect(getByText('Open')).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(queryByText('Open')).not.toBeInTheDocument();
    });
  });

  it('Should call handler on selection', async () => {
    const onSelection = fn();
    const { getByText } = render(
      <MenuBar items={items} onSelect={onSelection} noUniqueId />
    );

    expect(getByText('File')).toBeInTheDocument();

    fireEvent.click(getByText('File'));

    await waitFor(() => {
      expect(getByText('Open')).toBeInTheDocument();
      fireEvent.click(getByText('Open'));
    });

    expect(onSelection).toHaveBeenCalledWith({
      id: '1',
      path: 'File/Open',
    });
  });
});
