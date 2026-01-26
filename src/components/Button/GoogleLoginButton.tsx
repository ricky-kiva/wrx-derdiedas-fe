import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { useIsMobile } from '../../hooks/useIsMobile';

interface GoogleLoginButtonProps {
  fromGame?: boolean
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = (props) => {
  const { fromGame=false } = props;

  const { login } = useAuth();
  const { setToast } = useToast();
  const { closeModal } = useModal();
  const isMobile = useIsMobile();
  
  const navigate = useNavigate();
  
  const handleSuccess = async (credRes: CredentialResponse) => {
    if (!credRes.credential) {
      setToast('Login Error: Missing Google ID token');
      return;
    }

    await login(credRes.credential, fromGame);

    if (fromGame) {
      closeModal();
      navigate('/');
    }
  };

  return <GoogleLogin 
    useOneTap
    onSuccess={handleSuccess} 
    onError={() => setToast("Login failed")}
    text={isMobile ? 'signin' : 'signin_with'}
    shape={isMobile ? 'pill' : 'rectangular'}
    theme={isMobile ? 'filled_black' : 'outline'}
    width={isMobile ? 48 : undefined}
  />;
};
