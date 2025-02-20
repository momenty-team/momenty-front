import ChevronLeftIcon from '@/assets/svg/chevron-left.svg';

interface TopNavigationProps {
  children?: React.ReactNode;
  onClickBack: React.MouseEventHandler<HTMLButtonElement>;
  backGroundColor?: string;
}

function TopNavigation({ children, onClickBack, backGroundColor = 'white' }: TopNavigationProps) {
  return (
    <header
      className={`fixed top-0 left-0 w-full justify-between align-center flex py-3 px-4 z-50 ${backGroundColor && `bg-${backGroundColor}`}`}
    >
      <button type="button" onClick={onClickBack}>
        <ChevronLeftIcon width={24} height={24} />
      </button>
      {children}
    </header>
  );
}

export default TopNavigation;
