'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        borderDash: [4, 4], // 점선 스타일
        drawOnChartArea: true, // 차트 영역에 그리드 선 표시
        color: 'rgba(0, 0, 0, 0.1)', // 그리드 선 색상 설정
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// 최소값과 최대값을 생성하는 함수
const generateRangeData = () => {
  const min = Math.floor(Math.random() * 500); // 0-500 사이의 최소값
  const max = Math.floor(Math.random() * 500); // 최소값보다 큰 최대값 (최대 500 추가)

  if (min > max) {
    return [max, min];
  }

  return [min, max];
};

export const data = {
  labels,
  datasets: [
    {
      label: '범위 데이터',
      data: labels.map(() => generateRangeData()),
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

// Line 차트용 데이터 추가
export const lineData = {
  labels,
  datasets: [
    {
      label: '일반 선 그래프',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.1, // 선을 부드럽게 만들기 위한 값 (0: 직선, 1: 매우 곡선)
      pointRadius: 5, // 데이터 포인트의 크기
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
    {
      label: '두 번째 라인',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      fill: false,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      tension: 0.1,
      pointRadius: 5,
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
  ],
};

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[][] | number[] | (number | null)[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

export function BarChart({ data }: BarChartProps) {
  return <Bar options={options} data={data} />;
}

export function LineChart({ data }: BarChartProps) {
  return <Line options={options} data={data} />;
}

type SleepSample = {
  startDate: string;
  endDate: string;
  value: 'AWAKE' | 'REM' | 'CORE' | 'DEEP' | 'INBED';
};

const VALUE_TITLE_MAP = {
  AWAKE: '비수면',
  REM: 'REM 수면',
  CORE: '코어 수면',
  DEEP: '깊은 수면',
  INBED: '취침시간',
};

const sleepColorMap: Record<SleepSample['value'], string> = {
  AWAKE: '#ff6b6b',
  REM: '#90e0ef',
  CORE: '#0077b6',
  DEEP: '#03045e',
  INBED: '#6a0dad',
};

const sleepOrder: SleepSample['value'][] = ['AWAKE', 'REM', 'CORE', 'DEEP'];

export function SleepChart({ sleepSamples }: { sleepSamples: SleepSample[] }) {
  const start = Math.min(...sleepSamples.map((s) => new Date(s.startDate).getTime()));
  const end = Math.max(...sleepSamples.map((s) => new Date(s.endDate).getTime()));
  const totalMillis = end - start;

  const sleepByLevel = sleepSamples.reduce<Record<SleepSample['value'], SleepSample[]>>(
    (acc, sample) => {
      if (!acc[sample.value]) {
        acc[sample.value] = [];
      }
      acc[sample.value].push(sample);
      return acc;
    },
    { AWAKE: [], REM: [], CORE: [], DEEP: [], INBED: [] }
  );

  const timeLabels = Array.from({ length: 4 }, (_, i) => {
    const time = new Date(start + (totalMillis * i) / 3);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  return (
    <div className="relative w-full flex flex-col gap-1" style={{ borderLeft: '1px solid #E8EBEF' }}>
      {sleepOrder.map((level) => (
        <div key={level} className="relative w-full min-h-14 h-14 z-10" style={{ borderBottom: '1px solid #E8EBEF' }}>
          <div className="absolute left-1 text-caption-2-m text-indigo-200">{VALUE_TITLE_MAP[level]}</div>
          <div className="relative w-full h-full">
            {sleepByLevel[level].map((sample, i) => {
              const sampleStart = new Date(sample.startDate).getTime();
              const sampleEnd = new Date(sample.endDate).getTime();

              const left = ((sampleStart - start) / totalMillis) * 100;
              const width = ((sampleEnd - sampleStart) / totalMillis) * 100;

              return (
                <div
                  key={`${level}-${i}`}
                  className="absolute rounded opacity-85 bottom-1.5"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    height: `24px`,
                    backgroundColor: sleepColorMap[sample.value],
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex justify-between text-label-1-m text-indigo-100 w-full">
        {timeLabels.map((_, idx) => (
          <div
            key={`line-${idx}`}
            className="absolute top-0 h-[calc(100%-20px)] border-l border-dashed border-indigo-50"
            style={{ left: `${(idx / 3) * 100}%`, display: `${idx === 0 && 'none'}` }}
          />
        ))}
        <div className="flex justify-between text-caption-2-m text-indigo-100 w-full">
          {timeLabels.map((label, idx) => (
            <div key={`label-${idx}`}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
