import IconGitHub from '../../assets/images/icon-github-1.svg?react';
import IconInstagram from '../../assets/images/icon-instagram-1.svg?react';
import IconLinkedIn from '../../assets/images/icon-linkedin-1.svg?react';
import FooterContact from './FooterContact';

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
  <FooterContact socials={contactSocials}/>
);
