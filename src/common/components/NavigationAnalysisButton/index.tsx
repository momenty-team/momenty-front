'use client';

import { postMessageToWebView } from '@/utils/webview';
import ChevronRightIcon from '@/assets/svg/chevron-right.svg';
import { useState } from 'react';

interface NavigationMenuButtonProps {
  title: string;
  icon?: JSX.Element;
  path: string;
}

function NavigationAnalysisButton({ title, icon, path }: NavigationMenuButtonProps) {
  const [activeButtonPath, setActiveButtonPath] = useState<string | null>(null);

  const activeTouchedButtonPath = (path: string) => {
    setActiveButtonPath(path);
  };

  const removeActiveButtonPath = () => {
    setActiveButtonPath(null);
  };

  const routeButtonPath = () => {
    if (activeButtonPath) {
      postMessageToWebView({ route: activeButtonPath });
      setActiveButtonPath(null);
    }
  };

  return (
    <button
      className="relative flex justify-center items-center ease-out origin-center group"
      onTouchStart={() => activeTouchedButtonPath(path)}
      onTouchMove={removeActiveButtonPath}
      onTouchEnd={routeButtonPath}
    >
      <div
        className={`absolute bg-transparent w-[calc(100%+16px)] h-[calc(100%+20px)] transition-all duration-300 ease-out ${activeButtonPath === path && 'group-active:bg-[#ebebeb] group-active:scale-[0.98]'} rounded-[6px]`}
      ></div>

      <div
        className={`w-full flex items-center justify-between ${activeButtonPath === path && 'group-active:scale-[0.96]'} transition-transform duration-200 ease-out origin-center relative`}
      >
        <div className="flex items-center gap-5">
          <div className="w-[52px] h-[52px] bg-indigo-5 rounded-[4px] flex items-center justify-center">{icon}</div>
          <div className="flex flex-col gap-1 text-left">
            <div className="text-body-3-m">{title}</div>
            <div className="text-label-1-r text-indigo-300">{title}</div>
          </div>
        </div>

        <ChevronRightIcon className="[&>path]:stroke-[#99A5B4] relative" style={{ width: 16, height: 16 }} />
      </div>
    </button>
  );
}

export default NavigationAnalysisButton;
