import { Dialog } from '../../../lib/components';

export const Default = (
  <Dialog width={450} height={300} animationType="pop">
    <span>Your content here!</span>
  </Dialog>
);

export const Drop = (
  <Dialog width={450} height={300} animationType="drop" size="lg">
    <span>Your content here!</span>
  </Dialog>
);

export const Rise = (
  <Dialog width={450} height={300} animationType="rise" size="md">
    <span>Your content here!</span>
  </Dialog>
);

export const SlideLeft = (
  <Dialog width={450} height={300} animationType="slide-left" size="md">
    <span>Your content here!</span>
  </Dialog>
);

export const SlideRight = (
  <Dialog width={450} height={300} animationType="slide-right" size="md">
    <span>Your content here!</span>
  </Dialog>
);
