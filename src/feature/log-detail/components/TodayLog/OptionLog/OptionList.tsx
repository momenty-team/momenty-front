import { useEffect, useRef, useState } from 'react';

interface OptionListProps {
  options: string[];
}

function OptionList({ options }: OptionListProps) {
  const optionListRef = useRef<HTMLDivElement | null>(null);
  const [scrollStates, setScrollStates] = useState<boolean>(false);
  const [rightScrollStates, setRightScrollStates] = useState<boolean>(false);

  const checkScroll = () => {
    if (optionListRef.current === null) return false;

    const { scrollWidth, clientWidth, scrollLeft } = optionListRef.current;
    const isScrollable = scrollWidth > clientWidth;
    const isRightScroll = scrollLeft + clientWidth < scrollWidth;

    setScrollStates(isScrollable);
    setRightScrollStates(isRightScroll);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);

    if (optionListRef.current) {
      optionListRef.current.addEventListener('scroll', checkScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (optionListRef.current) {
        optionListRef.current.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  return (
    <div ref={optionListRef} className="relative ml-auto flex gap-3 overflow-x-scroll scrollbar-hide bg-indigo-5">
      <div className="sticky left-0 h-[32px]">
        <div
          className="absolute left-0 w-[45px] min-h-full bg-gradient-to-l from-indigo-5/0 to-indigo-5"
          style={{
            visibility: scrollStates ? 'visible' : 'hidden',
          }}
        />
      </div>

      {options.map((item, index) => (
        <div
          key={index}
          className="flex py-1 px-3 w-fit text-nowrap rounded-[12px] bg-indigo-500 text-body-2-sb text-indigo-5"
        >
          {item}
        </div>
      ))}

      <div className="sticky right-0 h-[32px]">
        <div
          className="absolute right-0 w-[45px] min-h-full bg-gradient-to-r from-indigo-5/0 to-indigo-5"
          style={{
            visibility: rightScrollStates ? 'visible' : 'hidden',
          }}
        />
      </div>
    </div>
  );
}

export default OptionList;
