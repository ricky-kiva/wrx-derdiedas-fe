import { easeInOut } from 'framer-motion';

interface SlideUpProps { y: number; }
interface slideYBlurProps extends SlideUpProps { blur?: number; }

const SLIDE_UP_BLUR_DEFAULT: slideYBlurProps = { y: 24, blur: 2 };

export const slideYBlur = (props: slideYBlurProps=SLIDE_UP_BLUR_DEFAULT) => {
  const { y, blur } = props;

  return {
    initial: { opacity: 0, y: y, '--blur': `${blur}px` },
    animate: { opacity: 1, y: 0, '--blur': '0px', transition: { 
      duration: 0.4, ease: easeInOut
    }},
  };
};

export const fadeBlur = (blur: number=2) => {
  return {
    initial: { opacity: 0, filter: `blur(${blur}px)` },
    animate: { opacity: 1, filter: `blur(0px)` },
    exit: { opacity: 0, filter: `blur(${blur}px)` },
    transition: { duration: 0.4 }
  };
};
