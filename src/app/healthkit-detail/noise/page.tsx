'use client';
import { useState } from 'react';
import { BridgeData } from '@/types';
import useAppMessage from '@/common/hooks/useAppMessage';
import { BarChart } from '@/common/components/Chart';

function getWeekdayFromISOString(isoString: string): string {
  const date = new Date(isoString);

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return weekdays[date.getDay()];
}

function HealthKitNoiseDetailPage() {
  const [data, setData] = useState<BridgeData['healthKitData'] | null>(null);
  const [snapIndex, setSnapIndex] = useState(0);

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
      data: data?.environmentalAudioExposure?.map(({ value }) => Number(value.toFixed(0))) || [],
      ...commonDatasetOptions,
    },
  ];

  const headphoneAudioExposureLabels =
    data?.headphoneAudioExposure?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  const headphoneAudioExposureDatasets = [
    {
      label: '이어폰 소음 노출',
      data: data?.headphoneAudioExposure?.map(({ value }) => Number(value.toFixed(0))) || [],
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
        <div className="text-indigo-700 text-body-3-sb">소음</div>
      </header>

      <section
        className="fixed top-[40px] w-full flex flex-col align-center overflow-y-scroll transition-[height] duration-300"
        style={{
          height: snapIndex > 1 ? `calc(100vh - 100px)` : 'calc(100vh / 9 * 5 - 100px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
          <BarChart data={{ labels: environmentalAudioExposureLabels, datasets: environmentalAudioExposureDatasets }} />
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh/9*5-100px)] px-5">
          <BarChart data={{ labels: headphoneAudioExposureLabels, datasets: headphoneAudioExposureDatasets }} />
        </div>
      </section>
    </>
  );
}

export default HealthKitNoiseDetailPage;
