import ChevronRightIcon from '@/assets/svg/chevron-right.svg';

function Home() {
  return (
    <div className="flex flex-col pt-[80px] pl-[16px] pr-[16px] bg-indigo-5">
      <h1 className="mb-[120px]">Home</h1>
      <button className="flex flex-col p-[20px] gap-[20px] rounded-[20px] shadow-4 bg-white">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-row items-center justify-center gap-[8px]">
            <div className="w-5 h-5 bg-indigo-100 rounded-md" />
            <span className="text-body-2-m">기록 추가하기</span>
          </div>
          <ChevronRightIcon className="flex" />
        </div>
        <span className="text-indigo-100 text-body-2-r">나만의 기록을 만들어 보세요.</span>
      </button>
    </div>
  );
}

export default Home;
