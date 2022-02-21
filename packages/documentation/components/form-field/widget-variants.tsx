import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormField } from '../../../lib/components/form-field/form-field';

export const Default = (
  <FormField
    label="Please enter the name"
    placeholder="Your name"
    debounce={2000}
    onChange={val => console.log(val)}
  />
);

export const State = (
  <FormField
    label="Please enter the name"
    placeholder="Your name"
    debounce={2000}
    onChange={val => console.log(val)}
    state="error"
  />
);

export const RTL = (
  <FormField
    label="Please enter the name"
    placeholder="Your name"
    debounce={2000}
    onChange={val => console.log(val)}
    RTL
  />
);

export const Icon = (
  <FormField
    label="Please enter the name"
    placeholder="Your name"
    icon={<FontAwesomeIcon icon={faUser} />}
  />
);
