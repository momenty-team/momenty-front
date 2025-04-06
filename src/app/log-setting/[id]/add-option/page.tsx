import AddOption from '@/feature/log-setting/add-option/AddOption';
import { cookies } from 'next/headers';
import type { RecordOptionsResponse } from '@/types/apis/records';

async function AddOptionPage({ params }: { params: { id: string } }) {
  const routeParams = await params;
  const cookieHeader = (await cookies()).toString();
  const optionResponse = await fetch(`https://api.momenty.co.kr/records/${routeParams.id}/options`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
  });

  if (!optionResponse.ok) throw new Error('데이터를 가져오지 못했습니다.');

  const { options }: RecordOptionsResponse = await optionResponse.json();

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between pt-2 px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle-1-b">옵션을 추가해주세요!</span>
          <span className="text-label-1-r text-indigo-100">
            추가하고 싶은 옵션을 입력해주세요. <p />
            옵션을 삭제하면 해당 옵션과 관련된 데이터가 삭제됩니다.
          </span>
        </div>
      </div>
      <AddOption initialOptions={options} />
    </div>
  );
}

export default AddOptionPage;
