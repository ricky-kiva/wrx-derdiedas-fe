import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import type { GoldenButtonProps } from '../Button';
import type { GoldenNavProps } from '../Nav';
import { HDivider } from '../Content';

interface MobileHeaderMenuProps {
  itemProps: (GoldenButtonProps | GoldenNavProps)[];
}

export const MobileHeaderMenu = forwardRef<HTMLDivElement, MobileHeaderMenuProps>(
  ({ itemProps }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute top-14 z-[2] right-0 flex flex-col bg-bg-indigo rounded-[17.5px] shadow-2xl p-3"
      >
        {itemProps.map((item, i) => {
          const Icon = item.icon;

          const content = (
            <nav className="group flex gap-3 items-center text-brdr-goldBrdrBottom hover:text-brdr-goldBrdrTop transition-colors duration-200">
              {Icon && <Icon className="w-3 h-3 fill-brdr-goldBrdrBottom group-hover:fill-brdr-goldBrdrTop" />}
              {'label' in item && item.label}
              {'text' in item && item.text}
            </nav>
          );

          let element;

          if ('to' in item) {
            const isExternal = /^https?:\/\//.test(item.to);

            element = isExternal
              ? <a href={item.to} target="_blank" rel="noopener noreferrer" className="w-full">{content}</a>
              : <Link to={item.to} className="w-full">{content}</Link>;
          } else {
            element = <button onClick={item.onClick} className="w-full text-left">{content}</button>;
          }

          return (
            <div key={i} className="w-full">
              {element}
              {i < itemProps.length - 1 && <HDivider dark margin={6} />}
            </div>
          );
        })}
      </div>
    );
  }
);
