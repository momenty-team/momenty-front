'use client';

import { useState } from 'react';
import { SleepChart } from '@/common/components/Chart';
import useAppMessage from '@/common/hooks/useAppMessage';
import type { CustomHealthSleepValue } from '@/types';

export const calculateTotalSleepTime = (sleepSamples: CustomHealthSleepValue[]) => {
  const sleepOnly = sleepSamples
    .filter((sample) => sample.value !== 'AWAKE')
    .map((sample) => ({
      start: new Date(sample.startDate).getTime(),
      end: new Date(sample.endDate).getTime(),
    }));

  // 1. start 기준으로 정렬
  const sorted = sleepOnly.sort((a, b) => a.start - b.start);

  // 2. 겹치는 구간 병합
  const merged: { start: number; end: number }[] = [];
  for (const interval of sorted) {
    if (merged.length === 0 || merged[merged.length - 1].end < interval.start) {
      merged.push({ ...interval });
    } else {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, interval.end);
    }
  }

  // 3. 병합된 구간들의 총 수면 시간 계산
  const totalMillis = merged.reduce((sum, interval) => sum + (interval.end - interval.start), 0);

  const totalMinutes = Math.floor(totalMillis / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분`;
};

function HealthKitSleepDetailPage() {
  const [data, setData] = useState<CustomHealthSleepValue[] | null>(null);
  const [snapIndex, setSnapIndex] = useState(0);

  useAppMessage(({ bottomSheet, healthKitData }) => {
    if (healthKitData && healthKitData.sleepSamples) {
      setData(healthKitData.sleepSamples);
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
        <div className="text-indigo-700 text-body-3-sb">수면</div>
        <span className="text-body-4-m text-indigo-300">{calculateTotalSleepTime(data ?? [])}</span>
      </header>

      <section
        className="fixed top-[48px] w-full flex flex-col align-center overflow-y-scroll transition-[height] duration-300 gap-12 px-5"
        style={{
          height: snapIndex > 1 ? `calc(100vh - 60px)` : 'calc(100vh / 9 * 5 - 72px)',
        }}
      >
        {data && <SleepChart sleepSamples={data} />}
      </section>
    </>
  );
}

export default HealthKitSleepDetailPage;
