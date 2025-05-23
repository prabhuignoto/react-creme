import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { MenuBar } from '../menu-bar';

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

    await waitFor(() => {
      expect(getByText('File')).toBeInTheDocument();
    });

    fireEvent.click(getByText('File'));

    await waitFor(() => {
      expect(getByText('Open')).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(queryByText('Open')).not.toBeInTheDocument();
    });
  });

  it('Should call onSelect when a menu item is selected', async () => {
    const onSelectMock = vi.fn();
    const { getByText } = render(
      <MenuBar items={items} onSelect={onSelectMock} />
    );

    fireEvent.click(getByText('File'));

    await waitFor(() => {
      expect(getByText('Open')).toBeInTheDocument();
    });

    fireEvent.click(getByText('Open'));

    expect(onSelectMock).toHaveBeenCalledWith({
      id: '1',
      path: 'File/Open',
    });
  });

  it('Should render with icons when provided', () => {
    const icons = [
      <div key="1">FileIcon</div>,
      <div key="2">EditIcon</div>,
      <div key="3">HelpIcon</div>,
    ];
    const { getByText } = render(<MenuBar items={items} icons={icons} />);

    expect(getByText('FileIcon')).toBeInTheDocument();
    expect(getByText('EditIcon')).toBeInTheDocument();
    expect(getByText('HelpIcon')).toBeInTheDocument();
  });

  it('Should respect RTL mode', async () => {
    const { getByText, container } = render(
      <MenuBar items={items} RTL={true} />
    );

    // Check for RTL class on wrapper
    expect(container.firstChild).toHaveClass('right_aligned');

    fireEvent.click(getByText('File'));

    await waitFor(() => {
      expect(getByText('Open')).toBeInTheDocument();
      // Here you would check for RTL positioning of the menu
      // This depends on your implementation details
    });
  });

  it('Should use provided IDs when noUniqueId is true', () => {
    const customItems = [
      {
        id: 'custom-1',
        items: [{ name: 'Item' }],
        name: 'Custom',
      },
    ];

    const onSelectMock = vi.fn();
    const { getByText } = render(
      <MenuBar items={customItems} noUniqueId={true} onSelect={onSelectMock} />
    );

    fireEvent.click(getByText('Custom'));

    return waitFor(() => {
      expect(getByText('Item')).toBeInTheDocument();
      fireEvent.click(getByText('Item'));
      expect(onSelectMock).toHaveBeenCalledWith({
        id: 'custom-1',
        path: 'Custom/Item',
      });
    });
  });

  it('Should support different sizes', () => {
    const { container } = render(<MenuBar items={items} size="lg" />);

    // The exact class or attribute to check will depend on your implementation
    // This is a placeholder check
    expect(container.querySelector('[class*="lg"]')).toBeTruthy();
  });
});
