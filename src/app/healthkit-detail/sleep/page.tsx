'use  client';

// import { useState } from 'react';

// function getWeekdayFromISOString(isoString: string): string {
//   const date = new Date(isoString);

//   const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

//   return weekdays[date.getDay()];
// }

function HealthKitSleepDetailPage() {
  // const [data, setData] = useState<any>(null);
  // const [snapIndex, setSnapIndex] = useState(0);
  // const startDates = data?.sleepAnalysis;
  // const startDay = startDates?.[0].startDate ?? null;
  // const endDay = startDates?.[startDates.length - 1].startDate ?? null;

  // const sleepAnalysisLabels = data?.sleepAnalysis?.map(({ startDate }) => getWeekdayFromISOString(startDate)) || [];
  // const sleepAnalysisDatasets = [
  //   {
  //     label: '수면 분석',
  //     data: data?.sleepAnalysis?.map(({ value }) => value) || [],
  //     backgroundColor: '#69B1FF',ㄴ
  //     borderColor: '#69B1FF',
  //     borderWidth: 1,
  //   },
  // ];

  return (
    <div>
      <h1>수면 분석</h1>
    </div>
  );
}

export default HealthKitSleepDetailPage;
