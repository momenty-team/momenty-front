import ChevronLeftIcon from '@/assets/svg/chevron-left.svg';

interface TopNavigationProps { 
  children: React.ReactNode;
  onClickBack: () => void;
  backGroundColor?: string;
}

function TopNavigation({
  children,
  onClickBack,
  backGroundColor = 'bg-white',
}: TopNavigationProps) {
  return (
    <header className={`fixed top-0 left-0 w-full justify-between flex py-3 px-4 z-50 ${backGroundColor}`}>
      <button type="button" onClick={onClickBack}>
        <ChevronLeftIcon width={24} height={24}/>
      </button>
      {children}
    </header>
  );
}

export default TopNavigation;
