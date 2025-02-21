import { postMessageToWebView } from '@/utils';

function StepComplete() {
  const routeHome = () => {
    postMessageToWebView({ route: '/' });
  };

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-[#F4F6F9] pt-4 px-6 pb-[52px]">
      <h1 className="mb-6 text-subtitle-1-b">
        이제 물 섭취량을
        <br />
        기록할 수 있어요.
      </h1>
      <button
        onClick={routeHome}
        className={
          'w-full flex justify-center items-center bg-[#021730] text-[#F4F6F9] py-[14px] text-body-1-b h-14 rounded-[8px]'
        }
      >
        기록하기
      </button>
    </div>
  );
}

export default StepComplete;
