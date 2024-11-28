import React, {ReactNode} from 'react';

interface SectionHeaderProps {
  topHeading: string;
  heading: string;
  buttons?: ReactNode[];
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ topHeading, heading, buttons }) => {
  return (
    <div className="flex flex-col gap-2.5 md:gap-5">
      <div className="flex items-center gap-2.5 md:gap-4">
        <div className="w-2.5 md:w-5 h-6 md:h-10 rounded bg-black"></div>
        <h2 className="text-xs md:text-base font-semibold text-black">{topHeading}</h2>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-4xl font-semibold text-black">{heading}</h1>
        <div className="flex gap-2">
          {buttons?.map((button, index) => (
            <div key={index}>{button}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
