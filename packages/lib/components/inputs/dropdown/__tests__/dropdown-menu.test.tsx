import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { DropDownMenu } from '../dropdown-menu';
import { MenuOption } from '../dropdown-model';
import { DropdownMenuStyleModel } from '../dropdown-model';

const options: MenuOption[] = [
  { id: '123', name: 'option1', value: 'option1', visible: true },
  { id: '345', name: 'option2', value: 'option2', visible: true },
];

const handler = vi.fn();

const menuStyle: DropdownMenuStyleModel = {
  maxMenuHeight: 300,
  top: 10,
  width: 200,
};

describe('DropdownMenu', () => {
  it.concurrent('should render dropdown menu', async () => {
    const { getByRole } = render(
      <DropDownMenu
        options={options}
        handleSelection={handler}
        open
        style={menuStyle}
      />
    );

    await waitFor(() => {
      expect(getByRole('listbox')).toBeInTheDocument();
    });
  });
});
