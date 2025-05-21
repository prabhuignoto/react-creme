import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { Image, Reveal } from '../../../lib/components';
import { useAtomValue } from 'jotai';
import { responsiveState } from '../../atoms/home';

const blankStyle = {
  alignItems: 'flex-start',
  display: 'flex',
  fontSize: '1.2rem',
  justifyContent: 'center',
  minHeight: '1200px',
  paddingTop: '200px',
} as CSSProperties;

const imageWrapStyle = {
  display: 'flex',
  margin: '0 auto',
  width: '450px',
} as CSSProperties;

function widgets() {
  const ref = useRef<HTMLDivElement>(null);

  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isMobile) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(750);
    } else if (media.isBigScreen) {
      setWidth(850);
    } else if (media.isExtraLargeScreen) {
      setWidth(950);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widget" ref={ref}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '750px',
          overflowX: 'hidden',
          overflowY: 'auto',
          width: `${width}px`,
        }}
      >
        <div style={blankStyle}>⬇️ Scroll Down ⬇️</div>
        <Reveal parent={ref}>
          <p style={imageWrapStyle}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which dont look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isnt anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </p>
        </Reveal>
        <div style={blankStyle}>⬇️ Scroll Down ⬇️</div>
        <Reveal parent={ref}>
          <Image
            width={width}
            height={300}
            expandImageOnClick
            src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
          />
        </Reveal>
        <div style={blankStyle}>⬇️ Scroll Down ⬇️</div>
        <Reveal parent={ref}>
          <p style={imageWrapStyle}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which dont look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isnt anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </p>
        </Reveal>
      </div>
    </div>
  ) : null;
}

export default widgets;
