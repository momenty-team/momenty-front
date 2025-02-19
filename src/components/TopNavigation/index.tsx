import ChevronLeftIcon from '@/assets/svg/chevron-left.svg';

function TopNavigation({ children, onClickBack }: { children: React.ReactNode; onClickBack: () => void }) {
  return (
    <header className="fixed top-0 left-0 w-full justify-between flex py-3 px-4 z-50 bg-white">
      <button type="button" onClick={onClickBack}>
        <ChevronLeftIcon />
      </button>
      {children}
    </header>
  );
}

export default TopNavigation;
