import LogSettingDetail from '@/feature/log-setting/detail';
import { suitFont } from '@/styles/font';
import type { RecordDetail, RecordOptionsResponse } from '@/types/apis/records';
import { cookies } from 'next/headers';

interface LogSettingPageProps {
  params: {
    id: string;
    detailId: string;
    type: string;
  };
}

async function LogSettingPage({ params }: LogSettingPageProps) {
  const { id: recordId, detailId, type } = await params;
  const cookieHeader = (await cookies()).toString();

  const detailResponse = await fetch(`https://api.momenty.co.kr/records/${recordId}/details/${detailId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
  });

  const recordDetailData: RecordDetail = await detailResponse.json();

  if (type === 'option') {
    const optionResponse = await fetch(`https://api.momenty.co.kr/records/${recordId}/options`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    });

    if (!optionResponse.ok) throw new Error('데이터를 가져오지 못했습니다.');

    const { options }: RecordOptionsResponse = await optionResponse.json();

    return (
      <div className={`${suitFont.className} flex flex-col w-full h-[calc(100vh-48px)] max-h-[calc(100vh-48px)] px-5`}>
        <LogSettingDetail
          id={recordId}
          detailId={detailId}
          type={type}
          recordDetail={recordDetailData}
          options={options}
        />
      </div>
    );
  }

  return (
    <div className={`${suitFont.className} flex flex-col w-full h-[calc(100vh-48px)] max-h-[calc(100vh-48px)] px-5`}>
      <LogSettingDetail id={recordId} detailId={detailId} type={type} recordDetail={recordDetailData} />
    </div>
  );
}

export default LogSettingPage;
