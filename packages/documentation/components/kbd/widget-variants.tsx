import React from 'react';
import { Kbd } from '../../../lib/components';
import { KbdCombination } from '../../../lib/components/kbd/kbd';

export const Default = <Kbd>Shift</Kbd>;

export const WithCombination = (
  <KbdCombination>
    <Kbd>Ctrl</Kbd>
    <Kbd>Alt</Kbd>
    <Kbd>Shift</Kbd>
  </KbdCombination>
);

export const smallSized = (
  <KbdCombination size="sm">
    <Kbd size="sm">Shift</Kbd>
    <Kbd size="sm">Alt</Kbd>
    <Kbd size="sm">X</Kbd>
  </KbdCombination>
);

export const mediumSized = (
  <KbdCombination size="md">
    <Kbd size="md">Shift</Kbd>
    <Kbd size="md">Alt</Kbd>
    <Kbd size="md">X</Kbd>
  </KbdCombination>
);

export const largeSized = (
  <KbdCombination size="lg">
    <Kbd size="lg">Shift</Kbd>
    <Kbd size="lg">Alt</Kbd>
    <Kbd size="lg">X</Kbd>
  </KbdCombination>
);

export const ButtonRaisedRight = (
  <KbdCombination>
    <Kbd buttonRaised="right">Shift</Kbd>
    <Kbd buttonRaised="right">Alt</Kbd>
    <Kbd buttonRaised="right">X</Kbd>
  </KbdCombination>
);
