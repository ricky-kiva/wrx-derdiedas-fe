import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useEffect, useState } from 'react';

export const GoogleLoginButton: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);

  const { login } = useAuth();
  const { setToast } = useToast();

  useEffect(() => {
    const updateType = () => { setIsCompact(window.innerWidth < 1024); };

    updateType();

    window.addEventListener('resize', updateType);

    return () => window.removeEventListener('resize', updateType);
  }, []);
  
  const handleSuccess = async (credRes: CredentialResponse) => {
    if (!credRes.credential) {
      setToast('Login Error: Missing Google ID token');
      return;
    }

    await login(credRes.credential);
  };

  return <GoogleLogin 
    useOneTap
    onSuccess={handleSuccess} 
    onError={() => setToast("Login failed")}
    text={isCompact ? 'signin' : 'signin_with'}
    shape={isCompact ? 'pill' : 'rectangular'}
    theme={isCompact ? 'filled_black' : 'outline'}
  />;
};
