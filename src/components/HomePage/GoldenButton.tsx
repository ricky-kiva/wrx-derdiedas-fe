import IconMagnifyingGlass from '../../assets/images/icon-magnifying-glass-1.svg?react';

const GoldenButton = () => (
  <button className="bg-gradient-to-b from-brdr-goldBrdrTop to-brdr-goldBrdrBottom p-[1.5px] 
    rounded-full transition-shadow duration-300 hover:shadow-in-out-btn-top-gold"
  >
    <span className="flex items-center gap-x-2 bg-btn-gold px-8 py-[6px] rounded-full">
      <span>Check</span>
      <IconMagnifyingGlass className="w-3 h-3 fill-bg-indigo" />
    </span>
  </button>
);

export default GoldenButton;
