import { Kbd, KbdCombination } from '../../../lib/components';

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
  <KbdCombination>
    <Kbd>Shift</Kbd>
    <Kbd>Alt</Kbd>
    <Kbd>X</Kbd>
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
export const Thickness = (
  <KbdCombination>
    <Kbd buttonRaised="right" thickness={5}>
      Shift
    </Kbd>
    <Kbd buttonRaised="right" thickness={5}>
      Alt
    </Kbd>
    <Kbd buttonRaised="right" thickness={5}>
      X
    </Kbd>
  </KbdCombination>
);
