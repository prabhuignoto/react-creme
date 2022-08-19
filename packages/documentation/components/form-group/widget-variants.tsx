import { faFlag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Input } from '@core';
import { Dropdown, FormField, FormGroup } from '@inputs';

export const Default = (
  <FormGroup>
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
