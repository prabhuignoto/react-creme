import { faFlag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FormField, Input } from '../../../lib/components';
import { Dropdown } from '../../../lib/components/dropdown/dropdown';

export const Default = (
  <FormField label="Please enter the name">
    <Input id="name" placeholder="Name" enableClear />
  </FormField>
);

export const State = (
  <FormField label="Please enter the name">
    <Input id="name" placeholder="Name" enableClear state="error" />
  </FormField>
);

export const RTL = (
  <FormField label="Please enter the name" RTL>
    <Input id="name" placeholder="Name" enableClear />
  </FormField>
);

export const Icon = (
  <FormField
    label="Please enter the name"
    icon={<FontAwesomeIcon icon={faUser} />}
  >
    <Input id="name" placeholder="Name" enableClear />
  </FormField>
);

export const IconCode = `<FormField
    label="Please enter the name"
    icon={<FontAwesomeIcon icon={faUser} />}
>
  <Input id="name" placeholder="Name" enableClear />
</FormField>`;

export const DropdownField = (
  <FormField
    label="Please select a Country"
    icon={<FontAwesomeIcon icon={faFlag} />}
  >
    <Dropdown
      placeholder=""
      maxMenuHeight={280}
      options={[
        {
          name: 'India',
        },
        {
          name: 'USA',
        },
        {
          name: 'UK',
        },
        {
          name: 'Brazil',
        },
        {
          name: 'China',
        },
      ]}
    />
  </FormField>
);

export const DropdownFieldCode = `<FormField
    label="Please select a Country"
    icon={<FontAwesomeIcon icon={faFlag} />}
>
  <Dropdown
    placeholder=""
    maxMenuHeight={280}
    options={[
      {
        name: 'India',
      },
      {
        name: 'USA',
      },
      {
        name: 'UK',
      },
      {
        name: 'Brazil',
      },
      {
        name: 'China',
      },
    ]}
  />
</FormField>`;
