import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      The FileUpload component is a comprehensive file upload solution that
      provides a user-friendly interface for selecting and managing files. It
      supports multiple file selection methods including click to browse, drag
      and drop, and paste from clipboard.
    </p>
    <p>
      The component includes built-in validation for file types, file sizes, and
      maximum file counts. It also features automatic image thumbnail generation,
      progress tracking, and full accessibility support including keyboard
      navigation and screen reader compatibility.
    </p>
  </div>
);

function index() {
  return (
    <DemoPageRenderer
      title="File Upload"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faUpload} size="2x" />}
      sourceId="file-upload/file-upload.tsx"
      editId="file-upload"
      tabTitles={['Examples', 'Properties', 'Playground']}
      features={[
        'Multiple file selection',
        'Drag and drop support',
        'Paste from clipboard',
        'File type validation (accept prop)',
        'File size validation (maxSize prop)',
        'Maximum files limit (maxFiles prop)',
        'Image thumbnail previews',
        'Upload progress tracking',
        'Custom drop zone content',
        'Size variants (sm, md, lg)',
        'Dark mode support',
        'RTL support',
        'Full keyboard accessibility',
        'WCAG 2.1 AA compliant',
      ]}
      callbacks={[
        {
          default: '',
          description: 'Callback executed when files are selected or changed. Receives an array of valid File objects.',
          name: 'onChange',
          optional: 'yes',
          type: '(files: File[]) => void',
        },
        {
          default: '',
          description: 'Callback executed when a validation error occurs. Receives error details.',
          name: 'onError',
          optional: 'yes',
          type: '(error: FileUploadError) => void',
        },
        {
          default: '',
          description: 'Callback executed when files are dropped. Called before onChange.',
          name: 'onDrop',
          optional: 'yes',
          type: '(files: File[]) => void',
        },
        {
          default: '',
          description: 'Callback executed when files are pasted from clipboard. Called before onChange.',
          name: 'onPaste',
          optional: 'yes',
          type: '(files: File[]) => void',
        },
      ]}
      properties={[
        {
          default: "''",
          description: 'Accepted file types (e.g., "image/*", ".pdf,.doc", "image/png,image/jpeg"). Follows HTML input accept attribute format.',
          name: 'accept',
          optional: 'yes',
          type: 'String',
        },
        {
          default: '',
          description: 'Maximum file size in bytes. Files larger than this will be rejected.',
          name: 'maxSize',
          optional: 'yes',
          type: 'Number',
        },
        {
          default: 'Infinity',
          description: 'Maximum number of files that can be selected.',
          name: 'maxFiles',
          optional: 'yes',
          type: 'Number',
        },
        {
          default: 'true',
          description: 'Whether to show upload progress bars.',
          name: 'showProgress',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: 'Whether to show image thumbnails for image files.',
          name: 'showThumbnails',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: 'Whether to enable drag and drop functionality.',
          name: 'enableDragDrop',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: 'Whether to enable paste from clipboard functionality.',
          name: 'enablePaste',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description: 'Disables the file upload component.',
          name: 'disabled',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'md',
          description: 'Component size variant. Can be <em>sm</em>, <em>md</em>, or <em>lg</em>.',
          name: 'size',
          optional: 'yes',
          type: 'String',
        },
        {
          default: '',
          description: 'Custom content to display in the drop zone. If not provided, default drop zone UI will be shown.',
          name: 'children',
          optional: 'yes',
          type: 'ReactNode',
        },
        {
          default: '',
          description: 'Additional CSS class name.',
          name: 'className',
          optional: 'yes',
          type: 'String',
        },
        {
          default: '',
          description: 'Inline styles.',
          name: 'style',
          optional: 'yes',
          type: 'CSSProperties',
        },
        {
          default: 'false',
          description: 'Right-to-left text direction support.',
          name: 'RTL',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: "'Upload files'",
          description: 'Accessible label for the file input.',
          name: 'ariaLabel',
          optional: 'yes',
          type: 'String',
        },
        {
          default: '',
          description: 'ID for the component.',
          name: 'id',
          optional: 'yes',
          type: 'String',
        },
        {
          default: "'Drag and drop files here, or click to browse'",
          description: 'Text to display in the drop zone.',
          name: 'dropZoneText',
          optional: 'yes',
          type: 'String',
        },
        {
          default: "'Browse files'",
          description: 'Text to display for the browse button.',
          name: 'browseButtonText',
          optional: 'yes',
          type: 'String',
        },
      ]}
      refMethods={[
        {
          description: 'Focus the file upload component.',
          name: 'focus',
          type: '() => void',
        },
        {
          description: 'Clear all selected files.',
          name: 'clear',
          type: '() => void',
        },
        {
          description: 'Get currently selected files.',
          name: 'getFiles',
          type: '() => File[]',
        },
        {
          description: 'Programmatically open the file browser.',
          name: 'browse',
          type: '() => void',
        },
      ]}
      demoWidget={<Widgets />}
    />
  );
}

export default index;
