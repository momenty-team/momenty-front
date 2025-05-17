'use client';

import { BarChart, LineChart } from '@/common/components/Chart';
import useAppMessage from '@/common/hooks/useAppMessage';
import { BridgeData } from '@/types';
import { calculateAverageValue, formatKoreanDate, getMinMaxValue } from '@/utils/healthKit';
import { useState } from 'react';

function getWeekdayFromISOString(isoString: string): string {
  const date = new Date(isoString);

  // 요일 배열 (일요일부터 시작)
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return weekdays[date.getDay()];
}

function HealthKitHeartRateDetailPage() {
  const [data, setData] = useState<BridgeData['healthKitData'] | null>(null);
  const [snapIndex, setSnapIndex] = useState(0);

  const startDates = data?.heartRateSamples;
  const startDay = startDates?.[0].startDate ?? null;
  const endDay = startDates?.[startDates.length - 1].startDate ?? null;

  const commonDatasetOptions = {
    backgroundColor: '#69B1FF',
    borderColor: '#69B1FF',
    borderWidth: 1,
  };

  const heartRateLabels = data?.heartRateSamples?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const heartRateDatasets = [
    {
      label: '심박수',
      data: data?.heartRateSamples?.map(({ min, max }) => [min || 0, max || 0]) || [],
      ...commonDatasetOptions,
    },
  ];

  const heartRateVariabilityLabels =
    data?.heartRateVariabilitySamples?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const heartRateVariabilityDatasets = [
    {
      label: '심박수 변이도',
      data: data?.heartRateVariabilitySamples?.map(({ value }) => value) || [],
      ...commonDatasetOptions,
    },
  ];

  const restingHeartRateLabels =
    data?.restingHeartRateSamples?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const restingHeartRateDatasets = [
    {
      label: '안정 심박수',
      data: data?.restingHeartRateSamples?.map(({ value }) => value) || [],
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
      <header className="fixed w-full flex flex-col items-center bg-white top-0 h-[40px]">
        <div className="text-indigo-700 text-body-3-sb">심박수</div>
      </header>

      <section
        className="fixed top-[40px] w-full flex flex-col align-center overflow-y-scroll transition-[height] duration-300"
        style={{
          height: snapIndex > 1 ? `calc(100vh - 100px)` : 'calc(100vh / 9 * 5 - 100px)',
        }}
      >
        <div>
          <div className="flex flex-col px-5 pb-2">
            <span className="text-label-1-m text-indigo-300">범위</span>
            <span className="text-body-4-sb">
              <strong className="text-subtitle-2-sb">
                {getMinMaxValue(data?.heartRateSamples ?? [])?.min.toFixed(0)} ~{' '}
                {getMinMaxValue(data?.heartRateSamples ?? [])?.max.toFixed(0)}{' '}
              </strong>
              BPM
            </span>
            <span className="text-body-4-m text-indigo-300">
              {formatKoreanDate(startDay ?? '')} ~ {formatKoreanDate(endDay ?? '')}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
            <BarChart data={{ labels: heartRateLabels, datasets: heartRateDatasets }} />
          </div>
        </div>

        <div>
          <div className="flex flex-col px-5 pb-2">
            <span className="text-label-1-m text-indigo-300">평균</span>
            <span className="text-body-4-sb">
              <strong className="text-subtitle-2-sb">
                {calculateAverageValue(data?.heartRateSamples ?? [])?.toFixed(1)}{' '}
              </strong>
              밀리초
            </span>
            <span className="text-body-4-m text-indigo-300">
              {formatKoreanDate(startDay ?? '')} ~ {formatKoreanDate(endDay ?? '')}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
            <LineChart data={{ labels: heartRateVariabilityLabels, datasets: heartRateVariabilityDatasets }} />
          </div>
        </div>

        <div>
          <div className="flex flex-col px-5 pb-2">
            <span className="text-label-1-m text-indigo-300">평균</span>
            <span className="text-body-4-sb">
              <strong className="text-subtitle-2-sb">
                {calculateAverageValue(data?.restingHeartRateSamples ?? [])?.toFixed(1)}{' '}
              </strong>
              BPM
            </span>
            <span className="text-body-4-m text-indigo-300">
              {formatKoreanDate(startDay ?? '')} ~ {formatKoreanDate(endDay ?? '')}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
            <LineChart data={{ labels: restingHeartRateLabels, datasets: restingHeartRateDatasets }} />
          </div>
        </div>
      </section>
    </>
  );
}

export default HealthKitHeartRateDetailPage;
