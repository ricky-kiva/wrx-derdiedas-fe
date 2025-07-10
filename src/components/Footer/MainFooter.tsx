import IconGitHub from '../../assets/images/icon-github-1.svg?react';
import IconInstagram from '../../assets/images/icon-instagram-1.svg?react';
import IconLinkedIn from '../../assets/images/icon-linkedin-1.svg?react';
import FooterContact from './FooterContact';
import FooterListenTo from './FooterListenTo';
import FooterNote from './FooterNote';

const labelTemplate = (social: string) => `Visit my ${social}`;

const contactSocials =[{
    icon: IconGitHub,
    label: labelTemplate('GitHub'),
    url: 'https://github.com/ricky-kiva'
  }, {
    icon: IconInstagram,
    label: labelTemplate('Instagram'),
    url: 'https://www.instagram.com/r.ckyslash/'
  }, {
    icon: IconLinkedIn,
    label: labelTemplate('LinkedIn'),
    url: 'https://www.linkedin.com/in/ricky-fadel/'
}];

export const MainFooter = () => (
  <div className='flex flex-col md:flex-row w-full justify-between items-center gap-x-4
  gap-y-3 md:gap-y-0'>
    <div className='order-1 md:order-2'>
      <FooterListenTo />  
    </div>
    <div className='order-2 md:w-1/3 lg:w-auto'>
      <FooterContact socials={contactSocials} />
    </div>
    <div className='order-3 md:order-1 md:w-1/3 lg:w-auto'>
      <FooterNote />
    </div>
  </div>
);
