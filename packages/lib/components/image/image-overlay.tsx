import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { withOverlay } from '../common/withOverlay';
import { Image } from './image';
import { ImageOverlayProps } from './image-model';
import './image.scss';

const ImageOverlayComponent: React.FunctionComponent<ImageOverlayProps> = ({
  src,
  isClosing,
  height = 0,
  width = 0,
}) => {
  const [docWidth, docHeight] = [
    Math.round(document.body.clientWidth * 0.9),
    Math.round(document.body.clientHeight * 0.9),
  ];

  const [canShow, setCanShow] = useState(false);

  const overlayClass = useMemo(() => {
    return classNames('rc-image-overlay', {
      'rc-image-overlay-close': isClosing,
      'rc-image-overlay-open': canShow,
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
      />
    </div>
  );
};

const ImageOverlay = withOverlay(ImageOverlayComponent, {
  backdropColor: 'rgba(0,0,0,0.5)',
});

export { ImageOverlayComponent };
export { ImageOverlay };
