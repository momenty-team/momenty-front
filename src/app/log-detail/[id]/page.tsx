import { cookies } from 'next/headers';
import LogDetail from '@/feature/log-detail/components';
import LogSettingButton from '@/feature/log-detail/components/LogSettingButton';
import type { RecordDetailsResponse, RecordOptionsResponse, RecordUnitResponse } from '@/types/apis/records';

interface LogDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: {
    year: string;
    month: string;
    day: string;
  };
}

async function LogDetailPage({ params, searchParams }: LogDetailPageProps) {
  const routeParams = await params;
  const { year, month, day } = searchParams;
  const cookieHeader = (await cookies()).toString();
  const detailsResponse = await fetch(
    `https://api.momenty.co.kr/records/${routeParams.id}/details?year=${year}&month=${month}&day=${day}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    }
  );

  if (!detailsResponse.ok) throw new Error('데이터를 가져오지 못했습니다.');

  const { title, method, records }: RecordDetailsResponse = await detailsResponse.json();

  if (method === 'NUMBER_TYPE') {
    const unitResponse = await fetch(
      `https://api.momenty.co.kr/records/${routeParams.id}/unit?year=${year}&month=${month}&day=${day}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      }
    );

    if (!unitResponse.ok) throw new Error('데이터를 가져오지 못했습니다.');

    const { unit }: RecordUnitResponse = await unitResponse.json();

    return (
      <>
        <header className="fixed w-full flex flex-col items-center pb-5 bg-white top-0">
          <div className="text-indigo-700 text-body-3-sb">{title}</div>
          <div className="text-indigo-100 text-caption-3-sb">오늘 남긴 기록이 아직 없어요.</div>
          <LogSettingButton id={routeParams.id} />
        </header>

        <LogDetail id={routeParams.id} logOption={method} title={title} logDetailList={records} unit={unit} />
      </>
    );
  }

  if (method === 'OPTION_TYPE') {
    const optionResponse = await fetch(
      `https://api.momenty.co.kr/records/${routeParams.id}/options?year=${year}&month=${month}&day=${day}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      }
    );

    if (!optionResponse.ok) throw new Error('데이터를 가져오지 못했습니다.');

    const { options }: RecordOptionsResponse = await optionResponse.json();

    return (
      <>
        <header className="fixed w-full flex flex-col items-center pb-5 bg-white top-0">
          <div className="text-indigo-700 text-body-3-sb">{title}</div>
          <div className="text-indigo-100 text-caption-3-sb">오늘 남긴 기록이 아직 없어요.</div>
          <LogSettingButton id={routeParams.id} />
        </header>

        <LogDetail id={routeParams.id} logOption={method} title={title} logDetailList={records} options={options} />
      </>
    );
  }

  return (
    <>
      <header className="fixed w-full flex flex-col items-center pb-5 bg-white top-0">
        <div className="text-indigo-700 text-body-3-sb">{title}</div>
        <div className="text-indigo-100 text-caption-3-sb">오늘 남긴 기록이 아직 없어요.</div>
        <LogSettingButton id={routeParams.id} />
      </header>

      <LogDetail id={routeParams.id} logOption={method} title={title} logDetailList={records} />
    </>
  );
}

export default LogDetailPage;
