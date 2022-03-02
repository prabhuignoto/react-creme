import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useCallback, useEffect, useMemo, useRef } from 'react';
import { Spinner } from '..';
import useFocusNew from '../common/effects/useFocusNew';
import { ImageProps } from './image-model';
import { ImageOverlay } from './image-overlay';
import styles from './image.module.scss';

const Image: React.FunctionComponent<ImageProps> = ({
  alt,
  expandImageOnClick = false,
  height = '100%',
  isOverlay = false,
  loading = 'lazy',
  src,
  width = '100%',
  fitImage = true,
  onLoad,
  showLoader = true,
  loaderSize = 'sm',
  focusable = true,
}) => {
  const [loaded, setLoaded] = React.useState(false);

  const imageNaturalDimension = useRef<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });

  const [imageDimension, setImageDimension] = React.useState<{
    height: number | string;
    width: number | string;
  }>({
    height: '100%',
    width: '100%',
  });

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [openOverlay, setOpenOverlay] = React.useState(false);

  const handleLoad = useCallback(
    (evt: React.SyntheticEvent<HTMLImageElement>) => {
      const width = evt.currentTarget.naturalWidth;
      const height = evt.currentTarget.naturalHeight;

      imageNaturalDimension.current = {
        height,
        width,
      };

      setTimeout(() => {
        setLoaded(true);
        onLoad?.(evt);
      }, 750);
    },
    []
  );

  const wrapperClass = useMemo(() => {
    return classNames(styles.image_wrapper, {
      [styles.image_clickable]: expandImageOnClick,
      [styles.image_loaded]: loaded,
    });
  }, [loaded]);

  const ImageClass = useMemo(() => {
    return classNames(styles.image, {
      [styles.image_loaded]: loaded,
      [styles.image_loading]: !loaded,
    });
  }, [loaded]);

  const style = useMemo(
    () =>
      ({
        '--height': Number.isInteger(height) ? `${height}px` : '100%',
        '--width': Number.isInteger(width) ? `${width}px` : '100%',
      } as CSSProperties),
    []
  );

  const imageStyle = useMemo(() => {
    const { width, height } = imageDimension;
    return fitImage
      ? {
          maxHeight: Number.isInteger(height) ? `${height}px` : height,
          maxWidth: Number.isInteger(width) ? `${width}px` : width,
        }
      : ({} as CSSProperties);
  }, [JSON.stringify(imageDimension), fitImage]);

  const handleOverlayOpen = useCallback(() => setOpenOverlay(true), []);

  const handleOverlayClose = useCallback(() => setOpenOverlay(false), []);

  const imageProps = useMemo(
    () =>
      expandImageOnClick && {
        onClick: handleOverlayOpen,
      },
    []
  );

  const onWrapperRef = useCallback(node => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

  const onImageRef = useCallback(node => {
    if (node) {
      imageRef.current = node;
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;

    if (!wrapper || !image) {
      return;
    }

    if (isOverlay && loaded) {
      const { width, height } = image;
      wrapper.style.setProperty('--width', `${width}px`);
      wrapper.style.setProperty('--height', `${height}px`);
      setImageDimension({
        height,
        width,
      });
    }
  }, [loaded]);

  const focusProps = useMemo(
    () => (focusable && expandImageOnClick ? { tabIndex: 0 } : {}),
    [focusable, expandImageOnClick]
  );

  if (focusable) {
    useFocusNew(wrapperRef, handleOverlayOpen);
  }

  return (
    <div
      className={wrapperClass}
      style={style}
      ref={onWrapperRef}
      {...focusProps}
      {...imageProps}
    >
      <img
        src={src}
        onLoad={handleLoad}
        onError={handleLoad}
        className={ImageClass}
        alt={alt}
        {...imageProps}
        loading={loading}
        ref={onImageRef}
        style={imageStyle}
      />
      {showLoader && !loaded && (
        <span className={styles.image_load_icon_wrapper}>
          <Spinner size={loaderSize} />
        </span>
      )}
      {openOverlay && src && (
        <ImageOverlay
          src={src}
          onClose={handleOverlayClose}
          width={imageNaturalDimension.current?.width}
          height={imageNaturalDimension.current?.height}
          showClose
        />
      )}
    </div>
  );
};

Image.displayName = 'Image';

export { Image };
