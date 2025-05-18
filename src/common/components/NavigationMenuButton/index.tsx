'use client';

import { postMessageToWebView } from '@/utils/webview';
import ChevronRightIcon from '@/assets/svg/chevron-right.svg';
import { useState } from 'react';

interface NavigationMenuButtonProps {
  title: string;
  icon?: JSX.Element;
  path: string;
  isExternal?: boolean;
}

function NavigationMenuButton({ title, icon, path, isExternal = false }: NavigationMenuButtonProps) {
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

  if (isExternal) {
    const handleExternalClick = () => {
      postMessageToWebView({ externalLink: { url: path } });
    };

    return (
      <button
        className="relative flex justify-center items-center ease-out origin-center group"
        onClick={handleExternalClick}
      >
        <div
          className={`absolute bg-transparent w-[calc(100%+16px)] h-[calc(100%+12px)] transition-all duration-300 ease-out rounded-[6px]`}
        ></div>

        <div
          className={`w-full flex items-center justify-between transition-transform duration-200 ease-out origin-center relative`}
        >
          <div className="flex items-center gap-4 ">
            <div className="w-8 h-8 bg-indigo-5 rounded-[4px] flex items-center justify-center">{icon}</div>
            <div className="text-body-2-sb">{title}</div>
          </div>

          <ChevronRightIcon className="[&>path]:stroke-[#99A5B4] relative" style={{ width: 16, height: 16 }} />
        </div>
      </button>
    );
  }

  return (
    <button
      className="relative flex justify-center items-center ease-out origin-center group"
      onTouchStart={() => activeTouchedButtonPath(path)}
      onTouchMove={removeActiveButtonPath}
      onTouchEnd={routeButtonPath}
    >
      <div
        className={`absolute bg-transparent w-[calc(100%+16px)] h-[calc(100%+12px)] transition-all duration-300 ease-out ${activeButtonPath === path && 'group-active:bg-[#ebebeb] group-active:scale-[0.98]'} rounded-[6px]`}
      ></div>

      <div
        className={`w-full flex items-center justify-between ${activeButtonPath === path && 'group-active:scale-[0.96]'} transition-transform duration-200 ease-out origin-center relative`}
      >
        <div className="flex items-center gap-4 ">
          <div className="w-8 h-8 bg-indigo-5 rounded-[4px] flex items-center justify-center">{icon}</div>
          <div className="text-body-2-sb">{title}</div>
        </div>

        <ChevronRightIcon className="[&>path]:stroke-[#99A5B4] relative" style={{ width: 16, height: 16 }} />
      </div>
    </button>
  );
}

export default NavigationMenuButton;
