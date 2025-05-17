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
  maintainAspectRatio: false, // 컨테이너 크기에 맞게 차트 크기 조정
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const datasetLabel = context.dataset.label || '';
          const value = context.dataset.data[context.dataIndex];

          // 안전하게 배열 데이터 접근
          if (Array.isArray(value)) {
            return `${datasetLabel}: [${value[0]}, ${value[1]}]`;
          }
          return `${datasetLabel}: ${value}`;
        },
      },
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
      data: number[][] | number[];
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
