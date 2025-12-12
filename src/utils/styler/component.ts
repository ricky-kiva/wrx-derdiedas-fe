export type CornerStyle = 'left' | 'right' | 'square';
export type ButtonType = 'submit' | 'button';

export const getCornerClass = (style?: CornerStyle) => {
  switch (style) {
    case 'left': return 'rounded-l-full';
    case 'right': return 'rounded-r-full';
    case 'square': return 'rounded-none';
    default: return 'rounded-full';
  }
};
