import { useAuth } from '../../hooks/useAuth';
import IconPenFancy from '../../assets/images/icon-pen-fancy-1.svg?react';
import IconCheck from '../../assets/images/icon-check-1.svg?react';
import { useEffect, useState } from 'react';
import { getUserPoint } from '../../services/user';
import LottieLoading from '../../assets/lottie/loading-1.json';
import Lottie from 'lottie-react';
import { formatNumberSuffix } from '../../utils/styler';
import { useToast } from '../../hooks/useToast';
import { GoldenButton } from '../Button';
import IconBurst from '../../assets/images/icon-burst-1.svg?react';
import IconX from '../../assets/images/icon-x-1.svg?react';
import { useModal } from '../../hooks/useModal';

export const UserInfo: React.FC = () => {
  const { user, updateUser, deleteUser } = useAuth();
  const { setToast } = useToast();
  const { closeModal } = useModal();
  
  const [isEditName, setIsEditName] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [prevName, setPrevName] = useState('');
  const [isPointLoading, setIsPointLoading] = useState(false);
  const [point, setPoint] = useState('');
  const [isUserUpdateLoading, setIsUserUpdateLoading] = useState(false);
  const [isConfirmingDeletion, setIsConfirmingDeletion] = useState(false);

  useEffect(() => {
    if (!user) closeModal();
  }, [closeModal, user]);

  useEffect(() => {
    const fetchPoint = async () => {
      if (!user) return;

      setIsPointLoading(true);

      try {
        const res = await getUserPoint(user?.id);
        if (res.data.status === 'success') {
          setPoint(formatNumberSuffix(res.data.data.point)); 
        }
      } finally {
        setPoint('0');
        setIsPointLoading(false);
      }
    };

    fetchPoint();
  }, [user]);

  const handleUpdateUser = async () => {
    if (!user?.id) return;

    if (name.length === 0) {
      setToast('Hey! where\'s the name?');
      setIsEditName(false);
      setName(prevName);
      return;
    };

    if (name === prevName) {
      setIsEditName(false);
      return;
    }

    setIsUserUpdateLoading(true);

    const updatedUser = await updateUser({ name });

    setIsUserUpdateLoading(false);
    setIsEditName(false);
    setName(updatedUser?.name ?? '');
  };

  const handleNameEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    await handleUpdateUser();
  };

  const handleNameBlur = async () => {
    await handleUpdateUser();
  };
  
  return (
    <div className='flex flex-col'>
      <table>
        <tbody>
          <tr className='base-table-row'>
            <td className='pr-1 base-table-data'><b>Name</b></td>
            <td className='pr-1 base-table-data'>
              {isEditName
                ? <input 
                  value={name}
                  minLength={1}
                  maxLength={30}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleNameEnter}
                  onBlur={handleNameBlur}
                  className='px-3 py-1 text-bg-indigo bg-form-black rounded-full outline-none'
                />
                : user?.name}
            </td>
            <td className='base-table-data'>
              {isUserUpdateLoading
                ? <Lottie 
                    animationData={LottieLoading} 
                    loop 
                    autoplay 
                    className='scale-[2] origin-center inline-block'
                    style={{
                      display: 'inline-block',
                      width: '18px',
                      height: '18px', 
                      paddingTop: '1.5px',
                      filter: 'brightness(0) saturate(100%) invert(9%) sepia(1%) saturate(6422%) hue-rotate(197deg) brightness(91%) contrast(95%)' 
                    }}  
                  />
                : <button onClick={isEditName 
                    ? handleUpdateUser 
                    : () => { 
                      setIsEditName(prev => !prev);
                      if (!isEditName) setPrevName(name);
                    }
                  }>
                  {isEditName 
                    ? <IconCheck className='w-3 h-3 transition-colors duration-200 hover:fill-brdr-goldBrdrTop' />
                    : <IconPenFancy className='w-3 h-3 transition-colors duration-200 hover:fill-brdr-goldBrdrTop'/>}
                </button>}
            </td>
          </tr>
          <tr className='base-table-row'>
            <td className='pr-1 base-table-data'><b>Email</b></td>
            <td className='pr-1 base-table-data'>{user?.email}</td>
            <td className='base-table-data'></td>
          </tr>
          <tr className='base-table-row'>
            <td className='pr-1 base-table-data'><b>Points</b></td>
            <td className='pr-1 base-table-data'>
              {isPointLoading
                ? <Lottie 
                  animationData={LottieLoading} 
                  loop 
                  autoplay 
                  className='scale-[2] origin-center inline-block'
                  style={{
                    display: 'inline-block',
                    width: '18px',
                    height: '18px', 
                    paddingTop: '1.5px',
                    filter: 'brightness(0) saturate(100%) invert(9%) sepia(1%) saturate(6422%) hue-rotate(197deg) brightness(91%) contrast(95%)' 
                  }}  
                />
                : point
              }
            </td>
            <td className='base-table-data'></td>
          </tr>
          <tr>
            {isConfirmingDeletion 
              ? <>
                <td className='pr-1 pt-4 base-table-data'><b>Are You Sure?</b></td>
                <td className='pr-1 pt-4 base-table-data'>
                  <div className='flex gap-2'>
                    <GoldenButton label='Yes. Delete my account' icon={IconCheck} onClick={async () => { await deleteUser(); }} />
                    <GoldenButton label='No. Do not delete my account' icon={IconX} onClick={() => setIsConfirmingDeletion(false)} />
                  </div>
                </td>
              </>
              : <>
                <td colSpan={2} className='pr-1 pt-4 base-table-data text-bg-indigo'>
                  <GoldenButton text='Delete Account' icon={IconBurst} iconLeft={true} onClick={() => setIsConfirmingDeletion(true)} />
                </td>
              </>
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
};
