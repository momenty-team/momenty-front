'use client';

import { BarChart } from '@/common/components/Chart';
import useAppMessage from '@/common/hooks/useAppMessage';
import { BridgeData } from '@/types';
import { useState } from 'react';

function getWeekdayFromISOString(isoString: string): string {
  const date = new Date(isoString);

  // 요일 배열 (일요일부터 시작)
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return weekdays[date.getDay()];
}

function HealthKitActivityDetailPage() {
  const [data, setData] = useState<BridgeData['healthKitData'] | null>(null);
  const [snapIndex, setSnapIndex] = useState(0);

  const commonDatasetOptions = {
    backgroundColor: '#69B1FF',
    borderColor: '#69B1FF',
    borderWidth: 1,
  };

  const distanceWalkingRunningLabels =
    data?.distanceWalkingRunning?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const distanceWalkingRunningDatasets = [
    {
      label: '걷기 + 달리기 거리',
      data: data?.distanceWalkingRunning?.map(({ value }) => Number(value.toFixed(0))) || [],
      ...commonDatasetOptions,
    },
  ];

  const activeEnergyBurnedLabels =
    data?.activeEnergyBurned?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const activeEnergyBurnedDatasets = [
    {
      label: '활동 에너지',
      data: data?.activeEnergyBurned?.map(({ value }) => Number(value.toFixed(0))) || [],
      ...commonDatasetOptions,
    },
  ];

  const stepCountLabels = data?.stepCount?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const stepCountDatasets = [
    {
      label: '걸음 수',
      data: data?.stepCount?.map(({ value }) => Number(value.toFixed(0))) || [],
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
        <div className="text-indigo-700 text-body-3-sb">활동</div>
      </header>

      <section
        className="fixed top-[40px] w-full flex flex-col align-center overflow-y-scroll transition-[height] duration-300"
        style={{
          height: snapIndex > 1 ? `calc(100vh - 100px)` : 'calc(100vh / 9 * 5 - 100px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
          <BarChart data={{ labels: distanceWalkingRunningLabels, datasets: distanceWalkingRunningDatasets }} />
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
          <BarChart data={{ labels: activeEnergyBurnedLabels, datasets: activeEnergyBurnedDatasets }} />
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
          <BarChart data={{ labels: stepCountLabels, datasets: stepCountDatasets }} />
        </div>
      </section>
    </>
  );
}

export default HealthKitActivityDetailPage;
