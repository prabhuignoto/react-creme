import { useState } from 'react';
import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { FileUpload } from '../../../lib/components';
import type { FileUploadError } from '../../../lib/components';
import {
  Default,
  ImageOnly,
  WithMaxSize,
  WithMaxFiles,
  Small,
  Medium,
  Large,
  Disabled,
  NoThumbnails,
  CustomContent,
  RTL,
} from './widget-variants';

function Widgets() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleError = (error: FileUploadError) => {
    setErrors(prev => [...prev, error.message]);
    // Clear error after 5 seconds
    setTimeout(() => {
      setErrors(prev => prev.slice(1));
    }, 5000);
  };

  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default File Upload" border={false}>
        <Text>
          The default file upload component allows users to select multiple
          files by clicking, dragging and dropping, or pasting from clipboard.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {Default}
        </DemoWidget>
      </Section>

      <Section size="md" title="Image Upload Only" border={false}>
        <Text>
          Restrict file uploads to specific types using the <code>accept</code>{' '}
          prop. This example only accepts image files.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {ImageOnly}
        </DemoWidget>
      </Section>

      <Section size="md" title="File Size Restriction" border={false}>
        <Text>
          Set a maximum file size using the <code>maxSize</code> prop (in
          bytes). This example limits files to 5MB.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {WithMaxSize}
        </DemoWidget>
      </Section>

      <Section size="md" title="Maximum Files Limit" border={false}>
        <Text>
          Limit the number of files that can be uploaded using the{' '}
          <code>maxFiles</code> prop.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {WithMaxFiles}
        </DemoWidget>
      </Section>

      <Section size="md" title="Size Variants" border={false}>
        <Text>
          The file upload component supports three size variants: small, medium,
          and large.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {Small}
        </DemoWidget>
        <DemoWidget name="FileUpload" width={500}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="FileUpload" width={600}>
          {Large}
        </DemoWidget>
      </Section>

      <Section size="md" title="Disabled State" border={false}>
        <Text>
          Disable the file upload component to prevent user interaction.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {Disabled}
        </DemoWidget>
      </Section>

      <Section size="md" title="Without Thumbnails" border={false}>
        <Text>
          Disable image thumbnails by setting <code>showThumbnails</code> to
          false.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {NoThumbnails}
        </DemoWidget>
      </Section>

      <Section size="md" title="Custom Drop Zone Content" border={false}>
        <Text>
          Customize the drop zone content by passing children to the component.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {CustomContent}
        </DemoWidget>
      </Section>

      <Section
        size="md"
        title="Interactive Example with Validation"
        border={false}
      >
        <Text>
          This example shows file upload with validation and error handling. Try
          uploading files larger than 2MB or non-PDF files to see error
          messages.
        </Text>
        <DemoWidget name="FileUpload" width={500}>
          <div>
            <FileUpload
              accept=".pdf"
              maxSize={2 * 1024 * 1024}
              maxFiles={5}
              onChange={handleChange}
              onError={handleError}
              dropZoneText="Upload PDF files (max 2MB, up to 5 files)"
            />
            {uploadedFiles.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Selected files ({uploadedFiles.length}):</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {errors.length > 0 && (
              <div
                style={{
                  backgroundColor: '#fee',
                  borderLeft: '4px solid #e32636',
                  borderRadius: '4px',
                  marginTop: '1rem',
                  padding: '0.75rem',
                }}
              >
                <strong>Errors:</strong>
                <ul style={{ marginBottom: 0, marginTop: '0.5rem' }}>
                  {errors.map((error, index) => (
                    <li key={index} style={{ color: '#e32636' }}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DemoWidget>
      </Section>

      <Section size="md" title="RTL Support" border={false}>
        <Text>
          The component supports right-to-left layouts using the{' '}
          <code>RTL</code> prop.
        </Text>
        <DemoWidget name="FileUpload" width={400}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
