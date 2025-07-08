import React from 'react';

interface FCSocialProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>,
  label: string;
  url: string;
}

interface FooterContactProps {
  socials: FCSocialProps[];
}

const infos = [
  <a href='https://ko-fi.com/rickyslash' target='_blank' rel='noopener noreferrer'>Buy me a <u>☕︎</u></a>,
  <>Made with ♡ by <a href='https://rickyslash.my.id/' target='_blank' rel='noopener noreferrer'><u>Rickyslash</u></a></>
];

const FooterContact: React.FC<FooterContactProps> = ({ socials }) => (
  <div className='flex gap-[6px] items-center'>
    <div className='flex gap-[6px]'>
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex'
        >
          { React.createElement(social.icon, { className: "w-3 h-3 fill-bg-indigo" }) }
        </a>
      ))}
    </div>
    {infos.map((info, i) => (
      <React.Fragment key={i}>
        <span>✦</span>
        <span>{info}</span>
      </React.Fragment>
    ))}
  </div>
);

export default FooterContact;
