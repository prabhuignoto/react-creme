import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { withOverlay } from '../common/withOverlay';
import { Image } from './image';
import { ImageOverlayProps } from './image-model';
import styles from './image.module.scss';

const ImageOverlayComponent: React.FunctionComponent<ImageOverlayProps> = ({
  src,
  isClosing,
  height = 0,
  width = 0,
  loaderSize = 'sm',
}) => {
  const [docWidth, docHeight] = [
    Math.round(document.body.clientWidth * 0.9),
    Math.round(document.body.clientHeight * 0.9),
  ];

  const [canShow, setCanShow] = useState(false);

  const overlayClass = useMemo(() => {
    return classNames(styles.image_overlay, {
      [styles.image_overlay_close]: isClosing,
      [styles.image_overlay_open]: canShow,
    });
  }, [isClosing, canShow]);

  useEffect(() => {
    setTimeout(() => setCanShow(true), 100);
  }, []);

  return (
    <div className={overlayClass}>
      <Image
        src={src}
        width={Math.min(docWidth, width)}
        height={Math.min(docHeight, height)}
        isOverlay
        loaderSize={loaderSize}
      />
    </div>
  );
};

const ImageOverlay = withOverlay(ImageOverlayComponent, {
  backdropColor: 'rgba(0,0,0,0.85)',
  name: 'imageOverlay',
});

export { ImageOverlayComponent };
export { ImageOverlay };
