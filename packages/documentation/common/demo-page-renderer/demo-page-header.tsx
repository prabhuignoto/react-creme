import { faCode, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, memo, ReactNode } from 'react';
import { Link, PageHeader } from '../../../lib/components';
import styles from './demo-page-renderer.module.scss';

type DemoHeaderProps = {
  description?: string | ReactNode;
  editId?: string;
  pageIcon?: React.ReactNode;
  sourceId?: string;
  title: string;
};

const DemoPageHeader: FunctionComponent<DemoHeaderProps> = memo(
  ({ title, editId, sourceId, description, pageIcon }) => {
    return (
      <PageHeader title={title} icon={pageIcon} size="lg">
        {typeof description !== 'string' ? (
          <div>{description}</div>
        ) : (
          <p>{description}</p>
        )}
        <div className={styles['rc-demo-page-links-container']}>
          {sourceId && (
            <Link
              target="_blank"
              accent="button"
              icon={<FontAwesomeIcon icon={faCode} />}
              href={`https://github.com/prabhuignoto/react-creme/tree/master/packages/lib/components/${sourceId}`}
            >
              View Source
            </Link>
          )}
          {editId && (
            <Link
              target="_blank"
              accent="button"
              icon={<FontAwesomeIcon icon={faEdit} />}
              href={`https://github.com/prabhuignoto/react-creme/tree/master/packages/documentation/components/${editId}/index.tsx`}
            >
              Edit this Page
            </Link>
          )}
        </div>
      </PageHeader>
    );
  }
);

DemoPageHeader.displayName = 'DemoPageHeader';

export { DemoPageHeader };
