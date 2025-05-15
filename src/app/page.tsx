'use client';

import ChevronRightIcon from '@/assets/svg/chevron-right.svg';
import BellIcon from '@/assets/svg/bell.svg';
import WriteIcon from '@/assets/svg/write.svg';
import WalkIcon from '@/assets/svg/walk.svg';
import HeartBeatIcon from '@/assets/svg/heart-beat.svg';
import SleepIcon from '@/assets/svg/sleep.svg';
import NoiseIcon from '@/assets/svg/noise.svg';
import { postMessageToWebView } from '@/utils/webview';
import { suitFont } from '@/styles/font';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import TextIcon from '@/assets/svg/text.svg';
import BooleanIcon from '@/assets/svg/boolean.svg';
import OptionIcon from '@/assets/svg/option.svg';
import NumberIcon from '@/assets/svg/number.svg';
import useAppMessage from '@/common/hooks/useAppMessage';
import { useSearchParams } from 'next/navigation';
import HealthKitSummaryButton from '@/common/components/HealthKitSummaryButton';

const ModelViewer = dynamic(() => import('@/common/components/CatModelViewer'), {
  ssr: false,
});

export interface RecordItem {
  id: number;
  title: string;
  method: 'option_type' | 'boolean_type' | 'number_type' | 'text_type';
  is_public: boolean;
}

function Home() {
  const searchParams = useSearchParams();
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const [record, setRecord] = useState<RecordItem[]>([]);
  const [healthKitData, setHealthKitData] = useState<any>(null);

  const routeCalendar = () => {
    postMessageToWebView({ route: '/calendar' });
  };

  const routeAlarm = () => {
    postMessageToWebView({ route: '/alarm' });
  };

  const routeAddLog = () => {
    postMessageToWebView({ route: '/add-log' });
  };

  useEffect(() => {
    const fetchRecords = async () => {
      const res = await fetch('/api/records');
      if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
      const data = await res.json();
      setRecord(data.records);
    };
    fetchRecords();
  }, []);

  useAppMessage(({ viewState, healthKitData }) => {
    if (healthKitData) {
      setHealthKitData(healthKitData);
    }
    if (viewState === 'focus') {
      const fetchRecords = async () => {
        const res = await fetch('/api/records');
        if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
        const data = await res.json();
        setRecord(data.records);
      };

      fetchRecords();
    }
  }, []);

  return (
    <main className={`w-full bg-indigo-5 pb-6 ${suitFont.className}`}>
      <header className="flex justify-between items-center px-4 py-2">
        <button className="text-subtitle-3-sb" onClick={routeCalendar}>
          {month}월 {day}일
        </button>
        <button onClick={routeAlarm}>
          <BellIcon width={26} height={26} />
        </button>
      </header>

      <div className="h-60 bg-indigo-50 mb-10 mx-4 mt-2 rounded-[12px]">
        <ModelViewer />
      </div>

      <section className="flex flex-col gap-5 mx-4">
        <button className="flex flex-col p-5 gap-5 rounded-[20px] shadow-4 bg-white" onClick={routeAddLog}>
          <div className="flex flex-row items-center w-full justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex items-center justify-center bg-indigo-5 rounded-[4px] w-[26px] h-[26px]">
                <WriteIcon width={26} height={26} />
              </div>
              <span className="text-body-2-m">기록 추가하기</span>
            </div>
            <ChevronRightIcon width={24} height={24} />
          </div>
          <span className="text-indigo-100 text-body-2-r">나만의 기록을 만들어 보세요.</span>
        </button>

        <HealthKitSummaryButton
          icon={<WalkIcon width={26} height={26} />}
          title="활동"
          items={[
            { label: '활동 에너지', value: healthKitData?.activeEnergyBurned, unit: 'kcal' },
            { label: '이동거리', value: healthKitData?.distanceWalkingRunning, unit: 'm' },
            { label: '걸음수', value: healthKitData?.stepCount, unit: '걸음', fixed: 0 },
          ]}
        />
        <HealthKitSummaryButton
          icon={<HeartBeatIcon width={26} height={26} />}
          title="심박수"
          items={[
            { label: '심박수', value: healthKitData?.heartRateSamples, unit: 'bpm' },
            { label: '심박 변이도', value: healthKitData?.heartRateVariabilitySamples, unit: 'ms', fixed: 2 },
            { label: '안정 심박수', value: healthKitData?.restingHeartRateSamples, unit: 'bpm' },
          ]}
        />
        <HealthKitSummaryButton
          icon={<NoiseIcon width={26} height={26} />}
          title="소음"
          items={[
            { label: '주변환경 소음', value: healthKitData?.environmentalAudioExposure, unit: 'dB', fixed: 1 },
            { label: '이어폰 소음 노출', value: healthKitData?.headphoneAudioExposure, unit: 'dB', fixed: 1 },
          ]}
        />
        <HealthKitSummaryButton
          icon={<SleepIcon width={26} height={26} />}
          title="수면"
          items={[{ label: '수면 분석', value: healthKitData?.sleepSamples, unit: 'ms' }]}
        />
        <div className="grid grid-cols-1 gap-5">
          {record?.map(({ id, title, method }) => (
            <button
              key={id}
              className="flex flex-col justify-between p-5 rounded-[20px] shadow-4 bg-white gap-5"
              onClick={() =>
                postMessageToWebView({
                  bottomSheet: {
                    name: 'log-detail',
                    state: 'open',
                    webviewRoute: `/log-detail/${id}`,
                    snapIndex: 1,
                  },
                })
              }
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center bg-indigo-5 rounded-[4px] w-[26px] h-[26px]">
                    {method === 'text_type' && <TextIcon />}
                    {method === 'boolean_type' && <BooleanIcon />}
                    {method === 'option_type' && <OptionIcon />}
                    {method === 'number_type' && <NumberIcon />}
                  </div>
                  <div className="text-body-2-m">{title}</div>
                </div>
                <ChevronRightIcon width={24} height={24} />
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
