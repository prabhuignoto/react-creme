import React from 'react';
import { BreadCrumb } from '../../../lib/components';

export const Default = (
  <BreadCrumb>
    <span>Home</span>
    <span>Features</span>
    <span>Bread Crumb</span>
  </BreadCrumb>
);

export const Slash = (
  <BreadCrumb icon="slash" selectedCrumbIndex={1}>
    <span>Home</span>
    <span>Features</span>
    <span>Bread Crumb</span>
  </BreadCrumb>
);

export const CustomIcon = (
  <BreadCrumb icon="arrow">
    <span>Home</span>
    <span>Features</span>
    <span>Bread Crumb</span>
  </BreadCrumb>
);

export const SelectedIndex = (
  <BreadCrumb icon="arrow" size="md" selectedCrumbIndex={2}>
    <span>Home</span>
    <span>Features</span>
    <span>Bread Crumb</span>
  </BreadCrumb>
);

export const CustomSize = (
  <BreadCrumb icon="arrow" size="lg">
    <span>Home</span>
    <span>Features</span>
    <span>Bread Crumb</span>
  </BreadCrumb>
);
