import { easeInOut } from 'framer-motion';

interface SlideUpProps { y: number; }
interface SlideUpBlurProps extends SlideUpProps { blur: number; }

const SLIDE_UP_BLUR_DEFAULT: SlideUpBlurProps = { y: 24, blur: 2 };

export const slideUpBlur = (props: SlideUpBlurProps=SLIDE_UP_BLUR_DEFAULT) => {
  const { y, blur } = props;

  return {
    initial: { opacity: 0, y: y, '--blur': `${blur}px` },
    animate: { opacity: 1, y: 0, '--blur': '0px', transition: { 
      duration: 0.5, ease: easeInOut
    }},
  };
};
