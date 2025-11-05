import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import { useError } from '../../hooks/useError';
import { useEffect, useState } from 'react';

export const GoogleLoginButton: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);

  const { login } = useAuth();
  const { setErrorMsg } = useError();

  useEffect(() => {
    const updateType = () => { setIsCompact(window.innerWidth < 1024); };

    updateType();

    window.addEventListener('resize', updateType);

    return () => window.removeEventListener('resize', updateType);
  }, []);
  
  const handleSuccess = async (credRes: CredentialResponse) => {
    try {
      if (!credRes.credential) {
        setErrorMsg('Login Error: Missing Google ID token');
        return;
      }

      await login(credRes.credential);
    } catch(e: unknown) {
      if (e instanceof Error) setErrorMsg(`Login Error: ${e.message}`);
      else setErrorMsg("Login failed");
    }
  };

  return <GoogleLogin 
    useOneTap
    onSuccess={handleSuccess} 
    onError={() => setErrorMsg("Login failed")}
    text={isCompact ? 'signin' : 'signin_with'}
    shape={isCompact ? 'pill' : 'rectangular'}
    theme={isCompact ? 'filled_black' : 'outline'}
  />;
};
