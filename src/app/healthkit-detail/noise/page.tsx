'use client';
import { useState } from 'react';
import { BridgeData } from '@/types';
import useAppMessage from '@/common/hooks/useAppMessage';
import { BarChart } from '@/common/components/Chart';
import { formatKoreanDate, getMinMaxValue } from '@/utils/healthKit';

function getWeekdayFromISOString(isoString: string): string {
  const date = new Date(isoString);

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return weekdays[date.getDay()];
}

function HealthKitNoiseDetailPage() {
  const [data, setData] = useState<BridgeData['healthKitData'] | null>(null);
  const [snapIndex, setSnapIndex] = useState(0);
  const startDates = data?.environmentalAudioExposure;
  const startDay = startDates?.[0].startDate ?? null;
  const endDay = startDates?.[startDates.length - 1].startDate ?? null;

  const commonDatasetOptions = {
    backgroundColor: '#69B1FF',
    borderColor: '#69B1FF',
    borderWidth: 1,
  };

  const environmentalAudioExposureLabels =
    data?.environmentalAudioExposure?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const environmentalAudioExposureDatasets = [
    {
      label: '주변환경 소음',
      data: data?.environmentalAudioExposure?.map(({ min, max }) => [min || 0, max || 0]) || [],
      ...commonDatasetOptions,
    },
  ];

  const headphoneAudioExposureLabels =
    data?.headphoneAudioExposure?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const headphoneAudioExposureDatasets = [
    {
      label: '이어폰 소음 노출',
      data: data?.headphoneAudioExposure?.map(({ min, max }) => [min || 0, max || 0]) || [],
      ...commonDatasetOptions,
    },
  ];

  useAppMessage(({ bottomSheet, healthKitData }) => {
    if (healthKitData) {
      setData(healthKitData);
    }

    if (bottomSheet?.state === 'close') {
      setSnapIndex(-1);
    }

    if (bottomSheet?.state === 'hold' && bottomSheet.snapIndex) {
      setSnapIndex(bottomSheet.snapIndex);
    }
  }, []);

  return (
    <>
      <header className="fixed w-full flex flex-col items-center bg-white top-0 h-[48px] pb-2">
        <div className="text-indigo-700 text-body-3-sb">소음</div>
        <span className="text-body-4-m text-indigo-300">
          {formatKoreanDate(startDay ?? '')} ~ {formatKoreanDate(endDay ?? '')}
        </span>
      </header>

      <section
        className="fixed top-[48px] w-full flex flex-col align-center overflow-y-scroll transition-[height] duration-300 gap-12"
        style={{
          height: snapIndex > 1 ? `calc(100vh - 60px)` : 'calc(100vh / 9 * 5 - 72px)',
        }}
      >
        <div>
          <div className="flex flex-col px-5 pb-2 mt-4">
            <span className="text-label-1-m text-indigo-300">주변환경 소음 범위</span>
            <span className="text-body-4-sb">
              <strong className="text-subtitle-2-sb">
                {getMinMaxValue(data?.environmentalAudioExposure ?? [])?.min.toFixed(0)} ~{' '}
                {getMinMaxValue(data?.environmentalAudioExposure ?? [])?.max.toFixed(0)}{' '}
              </strong>
              dB
            </span>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
            <BarChart
              data={{ labels: environmentalAudioExposureLabels, datasets: environmentalAudioExposureDatasets }}
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col px-5 pb-2">
            <span className="text-label-1-m text-indigo-300">이어폰 소음 노출 범위</span>
            <span className="text-body-4-sb">
              <strong className="text-subtitle-2-sb">
                {getMinMaxValue(data?.headphoneAudioExposure ?? [])?.min.toFixed(0)} ~{' '}
                {getMinMaxValue(data?.headphoneAudioExposure ?? [])?.max.toFixed(0)}{' '}
              </strong>
              dB
            </span>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
            <BarChart data={{ labels: headphoneAudioExposureLabels, datasets: headphoneAudioExposureDatasets }} />
          </div>
        </div>
      </section>
    </>
  );
}

export default HealthKitNoiseDetailPage;
