import { FileUpload } from '../../../lib/components';

export const Default = <FileUpload />;

export const ImageOnly = (
  <FileUpload
    accept="image/*"
    dropZoneText="Drop your images here"
    browseButtonText="Select images"
  />
);

export const WithMaxSize = (
  <FileUpload
    maxSize={5 * 1024 * 1024}
    dropZoneText="Max file size: 5MB"
  />
);

export const WithMaxFiles = (
  <FileUpload
    maxFiles={3}
    dropZoneText="Upload up to 3 files"
  />
);

export const Small = <FileUpload size="sm" />;

export const Medium = <FileUpload size="md" />;

export const Large = <FileUpload size="lg" />;

export const Disabled = <FileUpload disabled />;

export const NoThumbnails = (
  <FileUpload
    showThumbnails={false}
    dropZoneText="No preview thumbnails"
  />
);

export const NoProgress = (
  <FileUpload
    showProgress={false}
    dropZoneText="Upload without progress bars"
  />
);

export const CustomContent = (
  <FileUpload>
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>📁 Custom Upload Zone</h3>
      <p style={{ margin: 0, color: '#666' }}>
        Drag files here or click to browse
      </p>
    </div>
  </FileUpload>
);

export const RTL = <FileUpload RTL />;
