import classNames from "classnames";
import React, { CSSProperties, useCallback, useMemo, useRef } from "react";
import { CircularProgress } from "..";
import { ImageOverlay } from "./image-overlay";
import "./image.scss";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  expandOnClick?: boolean;
}

const Image: React.FunctionComponent<ImageProps> = ({
  src,
  width = "100%",
  height = "100%",
  expandOnClick = false,
  alt,
  loading = "lazy",
}) => {
  const [loaded, setLoaded] = React.useState(false);

  const imageDimension = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const [openOverlay, setOpenOverlay] = React.useState(false);

  const handleLoad = useCallback(
    (evt: React.SyntheticEvent<HTMLImageElement>) => {
      const width = evt.currentTarget.naturalWidth;
      const height = evt.currentTarget.naturalHeight;

      imageDimension.current = {
        height,
        width,
      };
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    },
    []
  );

  const wrapperClass = useMemo(() => {
    return classNames("rc-image-wrapper", {
      "rc-image-loaded": loaded,
      "rc-image-clickable": expandOnClick,
    });
  }, [loaded]);

  const ImageClass = useMemo(() => {
    return classNames("rc-image", {
      "rc-image-loaded": loaded,
      "rc-image-loading": !loaded,
    });
  }, [loaded]);

  const style = useMemo(
    () =>
      ({
        "--width": Number.isInteger(width) ? `${width}px` : "100%",
        "--height": Number.isInteger(height) ? `${height}px` : "100%",
      } as CSSProperties),
    []
  );

  const handleOverlayOpen = useCallback(() => {
    setOpenOverlay(true);
  }, []);

  const handleOverlayClose = useCallback(() => {
    setOpenOverlay(false);
  }, []);

  const imageProps = useMemo(
    () =>
      expandOnClick && {
        onClick: handleOverlayOpen,
      },
    []
  );

  return (
    <div className={wrapperClass} style={style}>
      <img
        src={src}
        onLoad={handleLoad}
        onError={handleLoad}
        className={ImageClass}
        alt={alt}
        {...imageProps}
        loading={loading}
      />
      {!loaded && (
        <span className="rc-image-load-icon-wrapper">
          <CircularProgress size={20} />
        </span>
      )}
      {openOverlay && src && (
        <ImageOverlay
          src={src}
          onClose={handleOverlayClose}
          width={imageDimension.current?.width}
          height={imageDimension.current?.height}
          showClose
        />
      )}
    </div>
  );
};

export { Image };
