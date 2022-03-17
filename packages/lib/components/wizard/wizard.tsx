import React, { FunctionComponent } from 'react';
import { WizardProps } from './wizard.model';
import styles from './wizard.module.scss';

const Wizard: FunctionComponent<WizardProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wizard_head}></div>
      <div className={styles.wizard_body}></div>
      <div className={styles.wizard_footer}></div>
    </div>
  );
};

export { Wizard };
