import { useError } from '../../hooks/useError';

export const JumpingToast: React.FC = () => {
  const { errorMsg } = useError();

  console.log("JumpingToast render. errorMsg =", errorMsg);

  if (!errorMsg) return null;

  return (
    <div className='fixed lg:bottom-5 bottom-9 left-1/2 -translate-x-1/2 px-5 py-2 
      bg-txt-black rounded-full animate-error-jump'
    >
      {errorMsg}
    </div>
  );
};
