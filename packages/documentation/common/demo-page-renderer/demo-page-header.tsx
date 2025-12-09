import { Code, Edit } from 'lucide-react';
import React, { FunctionComponent, memo, ReactNode } from 'react';
import { Link, PageHeader } from '../../../lib/components';
import { getSourceUrl, getEditUrl } from './utils';
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
  ({
    title,
    editId,
    sourceId,
    stackBlitzCodes: _stackBlitzCodes,
    description,
    pageIcon,
  }) => {
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
              icon={<Code size={24} />}
              href={getSourceUrl(sourceId)}
            >
              View Source
            </Link>
          )}
          {editId && (
            <Link
              target="_blank"
              accent="button"
              icon={<Edit size={24} />}
              href={getEditUrl(editId)}
            >
              Edit this Page
            </Link>
          )}
          {/* {stackBlitzCodes?.length && (
            <Link
              target="_blank"
              accent="button"
              icon={<ExternalLink size={24} />}
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
