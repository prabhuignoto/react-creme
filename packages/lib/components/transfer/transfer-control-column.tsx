import { ChevronRightIcon } from '@icons';
import React from 'react';
import { Button } from '../button/button';
import styles from './transfer.module.scss';

interface TransferControlModel {
  disableTransferLeft?: boolean;
  disableTransferRight?: boolean;
  onTransfer: (dir: string) => void;
  size?: 'sm' | 'md' | 'lg';
  /** ID of the source list (for aria-controls) */
  sourceId?: string;
  /** ID of the target list (for aria-controls) */
  targetId?: string;
  /** Callback to transfer all items to the right */
  onTransferAll?: (dir: string) => void;
  /** Whether transfer-all buttons should be hidden */
  hideTransferAll?: boolean;
}

/**
 * TransferControlColumn - Control buttons for moving items between transfer lists.
 * Provides accessible button controls with proper ARIA labels and relationships.
 *
 * @param {function} onTransfer - Callback when transfer button is clicked with direction ('left' or 'right')
 * @param {boolean} [disableTransferLeft] - Disable the transfer-left button
 * @param {boolean} [disableTransferRight] - Disable the transfer-right button
 * @param {'sm' | 'md' | 'lg'} [size] - Size variant for buttons
 * @param {string} [sourceId] - ID of the source list for aria-controls
 * @param {string} [targetId] - ID of the target list for aria-controls
 */
const TransferControlColumn: React.FunctionComponent<TransferControlModel> = ({
  onTransfer,
  disableTransferLeft,
  disableTransferRight,
  size,
  sourceId,
  targetId,
  onTransferAll,
  hideTransferAll,
}: TransferControlModel) => {
  return (
    <section className={styles.control_column} role="group" aria-label="Transfer controls">
      {!hideTransferAll && onTransferAll && (
        <Button
          type="icon"
          size={size}
          label="Move all to selected"
          onClick={() => onTransferAll('right')}
          disabled={disableTransferRight}
        >
          <ChevronRightIcon aria-hidden="true" />
        </Button>
      )}
      <Button
        type="icon"
        size={size}
        label="Move selected to selected"
        onClick={() => onTransfer('right')}
        disabled={disableTransferRight}
      >
        <ChevronRightIcon aria-hidden="true" />
      </Button>
      <Button
        type="icon"
        size={size}
        label="Move selected to available"
        onClick={() => onTransfer('left')}
        disabled={disableTransferLeft}
        style={{ transform: 'rotate(180deg)' }}
      >
        <ChevronRightIcon aria-hidden="true" />
      </Button>
      {!hideTransferAll && onTransferAll && (
        <Button
          type="icon"
          size={size}
          label="Move all to available"
          onClick={() => onTransferAll('left')}
          disabled={disableTransferLeft}
          style={{ transform: 'rotate(180deg)' }}
        >
          <ChevronRightIcon aria-hidden="true" />
        </Button>
      )}
    </section>
  );
};

TransferControlColumn.displayName = 'TransferControlColumn';

export { TransferControlColumn };
