import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { MenuBar } from '../overlay/menu-bar/menu-bar';

const items = [
  {
    id: '1',
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
  },
  {
    id: '2',
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
  },
  {
    id: '3',
    items: [
      {
        name: 'About',
      },
      {
        name: 'Version',
      },
    ],
    name: 'Help',
  },
];

describe('Menu Bar', () => {
  it.concurrent('should render menu bar items', () => {
    const { getByText } = render(<MenuBar items={items} />);

    expect(getByText('File')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
  });

  it.concurrent('Should open Menu on click', async () => {
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

  it.concurrent('Should close menu when clicked outside', async () => {
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

  it.concurrent('Should call handler on selection', async () => {
    const onSelection = vi.fn();
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
