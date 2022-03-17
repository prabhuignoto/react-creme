import React, { FunctionComponent } from 'react';
import { WizardHeadsProps } from './wizard.model';
import styles from './wizard.module.scss';

const WizardHeads: FunctionComponent<WizardHeadsProps> = ({ items }) => {
  return (
    <ul className={styles.wizard_head_wrapper}>
      {items.map((item, index) => {
        return (
          <li className={styles.wizard_head} key={index}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export { WizardHeads };
