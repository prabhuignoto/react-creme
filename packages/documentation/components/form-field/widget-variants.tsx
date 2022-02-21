import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormField, Input } from '../../../lib/components';

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
