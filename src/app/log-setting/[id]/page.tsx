import { cookies } from 'next/headers';
import LogSetting from '@/feature/log-setting/LogSetting';
import type { RecordDetailsResponse } from '@/types/apis/records';

interface LogSettingPageProps {
  params: Promise<{ id: string }>;
  searchParams: {
    year: string;
    month: string;
    day: string;
  };
}

async function LogSettingPage({ params, searchParams }: LogSettingPageProps) {
  const routeParams = await params;
  const cookieHeader = (await cookies()).toString();
  const detailsResponse = await fetch(`https://api.momenty.co.kr/records/${routeParams.id}/details`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
  });

  if (!detailsResponse.ok) throw new Error('데이터를 가져오지 못했습니다.');

  const { title, method, is_public: isPublic }: RecordDetailsResponse = await detailsResponse.json();

  if (method === 'NUMBER_TYPE') {
    const unitResponse = await fetch(`https://api.momenty.co.kr/records/${routeParams.id}/unit`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    });

    if (!unitResponse.ok) throw new Error('데이터를 가져오지 못했습니다.');

    const { unit } = await unitResponse.json();
    return (
      <div className="flex flex-col w-full h-[calc(100vh-48px)] pt-2 px-6">
        <div className="flex flex-col w-full">
          <h1 className="text-subtitle-3-sb mb-3">기록 설정</h1>
          <span className="text-body-3-m text-indigo-300">기록에 관한 전반적인 내용을 수정합니다.</span>
        </div>
        <LogSetting title={title} method={method} isPublic={isPublic} unit={unit} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-48px)] pt-2 px-6">
      <div className="flex flex-col w-full">
        <h1 className="text-subtitle-3-sb mb-3">기록 설정</h1>
        <span className="text-body-3-m text-indigo-300">기록에 관한 전반적인 내용을 수정합니다.</span>
      </div>
      <LogSetting title={title} method={method} isPublic={isPublic} />
    </div>
  );
}

export default LogSettingPage;
