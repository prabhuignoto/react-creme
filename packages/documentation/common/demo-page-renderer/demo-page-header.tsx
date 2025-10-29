import {
  faCode,
  faEdit,
  faExternalLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, memo, ReactNode } from 'react';
import { Link, PageHeader } from '../../../lib/components';
import { getSourceUrl, getEditUrl, getStackBlitzUrl } from './utils';
import styles from './demo-page-renderer.module.scss';

type DemoHeaderProps = {
  description?: string | ReactNode;
  editId?: string;
  pageIcon?: React.ReactNode;
  sourceId?: string;
  stackBlitzCodes?: string[];
  title: string;
};

/**
 * DemoPageHeader - Enhanced header with type-safe URL generation
 *
 * Changes from previous version:
 * - Uses URL builder utilities (no more hardcoded URLs)
 * - Type-safe URL generation
 * - Easier to update repository structure
 */
const DemoPageHeader: FunctionComponent<DemoHeaderProps> = memo(
  ({ title, editId, sourceId, stackBlitzCodes, description, pageIcon }) => {
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
              href={getSourceUrl(sourceId)}
            >
              View Source
            </Link>
          )}
          {editId && (
            <Link
              target="_blank"
              accent="button"
              icon={<FontAwesomeIcon icon={faEdit} />}
              href={getEditUrl(editId)}
            >
              Edit this Page
            </Link>
          )}
          {/* {stackBlitzCodes?.length && (
            <Link
              target="_blank"
              accent="button"
              icon={<FontAwesomeIcon icon={faExternalLink} />}
              href={getStackBlitzUrl(stackBlitzCodes[0]!)}
            >
              Open in StackBlitz
            </Link>
          )} */}
        </div>
      </PageHeader>
    );
  }
);

DemoPageHeader.displayName = 'DemoPageHeader';

export { DemoPageHeader };
