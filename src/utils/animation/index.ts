import { easeInOut } from 'framer-motion';

interface SlideYProps { y?: number; duration?: number }
interface SlideYBlurProps extends SlideYProps { blur?: number; }
interface FadeBlurProps { blur?: number, duration?: number; }

const DURATION_DEFAULT = 0.4;
const BLUR_DEFAULT = 2;

const SLIDE_UP_BLUR_DEFAULT: SlideYBlurProps = { y: 24, blur: BLUR_DEFAULT, duration: DURATION_DEFAULT };
const FADE_BLUR_DEFAULT: FadeBlurProps = { blur: BLUR_DEFAULT, duration: DURATION_DEFAULT };

export const slideYBlur = (props: SlideYBlurProps=SLIDE_UP_BLUR_DEFAULT) => {
  const { y, blur, duration } = props;

  return {
    initial: { opacity: 0, y: y, '--blur': `${blur}px` },
    animate: { opacity: 1, y: 0, '--blur': '0px', transition: {
      duration, ease: easeInOut
    }},
    exit: { opacity: 0, y: y, '--blur': `${blur}px`, transition: {
      duration, ease: easeInOut
    }}
  };
};

export const fadeBlur = (props: FadeBlurProps=FADE_BLUR_DEFAULT) => {
  const { blur, duration } = props;

  return {
    initial: { opacity: 0, filter: `blur(${blur}px)` },
    animate: { opacity: 1, filter: `blur(0px)` },
    exit: { opacity: 0, filter: `blur(${blur}px)` },
    transition: { duration }
  };
};
