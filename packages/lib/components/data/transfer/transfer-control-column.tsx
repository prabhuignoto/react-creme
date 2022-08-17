import React from 'react';
import { ChevronRightIcon } from '../../common/icons';
import { Button } from '../../inputs/button/button';
import styles from './transfer.module.scss';

interface TransferControlModel {
  disableTransferLeft?: boolean;
  disableTransferRight?: boolean;
  onTransfer: (dir: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const TransferControlColumn: React.FunctionComponent<TransferControlModel> = ({
  onTransfer,
  disableTransferLeft,
  disableTransferRight,
  size,
}: TransferControlModel) => {
  return (
    <section className={styles.control_column}>
      <Button
        type="icon"
        size={size}
        onClick={() => onTransfer('right')}
        disabled={disableTransferRight}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        type="icon"
        size={size}
        onClick={() => onTransfer('left')}
        disabled={disableTransferLeft}
        style={{ transform: 'rotate(180deg)' }}
      >
        <ChevronRightIcon />
      </Button>
    </section>
  );
};

TransferControlColumn.displayName = 'TransferControlColumn';

export { TransferControlColumn };
