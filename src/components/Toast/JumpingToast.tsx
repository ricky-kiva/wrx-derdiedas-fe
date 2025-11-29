import { useToast } from '../../hooks/useToast';

export const JumpingToast: React.FC = () => {
  const { toastMsg } = useToast();

  if (!toastMsg) return null;

  return (
    <div className='fixed z-50 lg:bottom-5 bottom-9 left-1/2 -translate-x-1/2 px-5 py-2 
      bg-txt-black rounded-full animate-error-jump text-center'
    >
      {toastMsg}
    </div>
  );
};
