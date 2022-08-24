import { faFlag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FormField, FormGroup, Input } from '../../../lib/components';
import { Dropdown } from '../../../lib/components/dropdown/dropdown';

export const Default = (
  <FormGroup>
    <FormField label="First Name" icon={<FontAwesomeIcon icon={faUser} />}>
      <Input id="name" placeholder="Name" enableClear />
    </FormField>
    <FormField
      label="Select your Country"
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
  </FormGroup>
);

export const DefaultCode = `<FormGroup>
  <FormField
    label="Please enter the name"
    icon={<FontAwesomeIcon icon={faUser} />}
  >
    <Input id="name" placeholder="Name" enableClear />
  </FormField>
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
</FormGroup>`;

export const RTL = (
  <FormGroup RTL>
    <FormField
      label="Please enter the name"
      RTL
      icon={<FontAwesomeIcon icon={faUser} />}
    >
      <Input id="name" placeholder="Name" enableClear />
    </FormField>
    <FormField
      label="Please select a Country"
      icon={<FontAwesomeIcon icon={faFlag} />}
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
  </FormGroup>
);

export const RTLCode = `<FormGroup RTL>
  <FormField
    label="Please enter the name"
    RTL
    icon={<FontAwesomeIcon icon={faUser} />}
  >
    <Input id="name" placeholder="Name" enableClear />
  </FormField>
  <FormField
    label="Please select a Country"
    icon={<FontAwesomeIcon icon={faFlag} />}
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
