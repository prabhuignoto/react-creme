import { Flag, User } from 'lucide-react';

import { FormField, FormGroup, Input } from '../../../lib/components';
import { Dropdown } from '../../../lib/components/dropdown/dropdown';

export const Default = (
  <FormGroup>
    <FormField label="First Name" icon={<User size={24} />}>
      <Input id="name" placeholder="Name" enableClear />
    </FormField>
    <FormField label="Select your Country" icon={<Flag size={24} />}>
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
  </FormGroup>
);

export const DefaultCode = `<FormGroup>
  <FormField
    label="Please enter the name"
    icon={<User size={24} />}
  >
    <Input id="name" placeholder="Name" enableClear />
  </FormField>
  <FormField
    label="Please select a Country"
    icon={<Flag size={24} />}
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
</FormGroup>`;

export const RTL = (
  <FormGroup RTL>
    <FormField label="Please enter the name" RTL icon={<User size={24} />}>
      <Input id="name" placeholder="Name" enableClear RTL />
    </FormField>
    <FormField label="Please select a Country" icon={<Flag size={24} />} RTL>
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
  </FormGroup>
);

export const RTLCode = `<FormGroup RTL>
  <FormField
    label="Please enter the name"
    RTL
    icon={<User size={24} />}
  >
    <Input id="name" placeholder="Name" enableClear RTL />
  </FormField>
  <FormField
    label="Please select a Country"
    icon={<Flag size={24} />}
    RTL
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
</FormGroup>`;
