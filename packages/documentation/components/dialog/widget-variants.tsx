import React from 'react';
import { Dialog } from '../../../lib/components';

export const Default = (
  <Dialog width={450} height={300} animationType="pop">
    <span>Test dialog content</span>
  </Dialog>
);

export const Drop = (
  <Dialog width={450} height={300} animationType="drop">
    <span>Test dialog content</span>
  </Dialog>
);
