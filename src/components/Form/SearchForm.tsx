import { GoldenButton } from '../Button';
import IconMagnifyingGlass from '../../assets/images/icon-magnifying-glass-1.svg?react';

interface SearchFormProps {
  word?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({ word='?' }) => (
  <form className='w-full md:w-3/4 lg:w-1/2 flex justify-center gap-x-2 md:gap-x-4'>
    <div className='flex flex-1 border-gold-hover rounded-full'>
      <div className='w-16 flex py-[1.5px] pl-[1.5px] pr-[0.75px] border-gold-color-only rounded-l-full'>
        <div className='w-16 flex justify-center items-center gap-x-2 px-5 bg-btn-gold rounded-l-full'>
          <span className='ml-1'>{word}</span>
        </div>
      </div>
      <div className='w-full flex p-[1.5px] border-gold-color-only rounded-r-full'>
        <input 
          type='text' 
          name='word' 
          className='w-full px-3 bg-form-black rounded-r-full outline-none' 
        />
      </div>
    </div>
    <GoldenButton text='Check' icon={IconMagnifyingGlass}/>
  </form>
);
