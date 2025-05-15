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

// // 범위 데이터를 파싱하는 함수
// const rangeDataParser = {
//   id: 'rangeData',
//   beforeLayout: function (chart: any) {
//     const dataset = chart.data.datasets[0];
//     if (!dataset._originalData) {
//       dataset._originalData = [...dataset.data];

//       // 실제 차트에 표시할 데이터를 평균값으로 변환
//       dataset.data = dataset._originalData.map((range: number[]) => {
//         // 최소값과 최대값의 평균을 표시
//         return (range[0] + range[1]) / 2;
//       });
//     }
//   },
//   beforeDatasetsDraw: function (chart: any) {
//     // 원본 데이터를 복원
//     const dataset = chart.data.datasets[0];
//     if (dataset._originalData) {
//       chart._oldData = dataset.data;
//       dataset.originalData = dataset._originalData;
//     }
//   },
// };

export const options = {
  responsive: true,
  maintainAspectRatio: false, // 컨테이너 크기에 맞게 차트 크기 조정
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '범위 데이터 차트 (최소-최대)',
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
      max: 1000,
      ticks: {
        stepSize: 100, // 100 단위로 눈금 설정
        count: 11, // 0부터 1000까지 100 단위로 11개의 눈금 표시
      },
      grid: {
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

// 범위 데이터를 표시하기 위한 플러그인
// const rangeBarPlugin = {
//   id: 'rangeBar',
//   afterDatasetsDraw(chart: any) {
//     const { ctx, data, chartArea, scales } = chart;
//     const dataset = data.datasets[0]; // 단일 데이터셋만 사용
//     const meta = chart.getDatasetMeta(0);

//     // 데이터셋의 각 항목에 대해 범위 표시
//     for (let i = 0; i < dataset.data.length; i++) {
//       if (!meta.data[i] || meta.hidden) continue;

//       const range = dataset.data[i];
//       const minValue = range[0];
//       const maxValue = range[1];

//       // 막대의 위치와 너비 가져오기
//       const barWidth = meta.data[i].width;
//       const barX = meta.data[i].x;

//       // 최소값과 최대값의 위치 계산
//       const minYPos = scales.y.getPixelForValue(minValue);
//       const maxYPos = scales.y.getPixelForValue(maxValue);

//       // 범위 표시를 위한 선 그리기
//       ctx.beginPath();
//       ctx.moveTo(barX, minYPos);
//       ctx.lineTo(barX, maxYPos);
//       ctx.lineWidth = 2;
//       ctx.strokeStyle = dataset.borderColor;
//       ctx.stroke();

//       // 최소값과 최대값 위치에 점 표시
//       ctx.beginPath();
//       ctx.arc(barX, minYPos, 4, 0, 2 * Math.PI);
//       ctx.arc(barX, maxYPos, 4, 0, 2 * Math.PI);
//       ctx.fillStyle = dataset.borderColor;
//       ctx.fill();
//     }
//   },
// };

function ChartEx() {
  return (
    <>
      <div style={{ height: '400px' }} className="bg-indigo-50 mb-10 mx-4 mt-2 rounded-[12px]">
        <Bar options={options} data={data} />
      </div>
      <div style={{ height: '400px' }} className="bg-indigo-50 mb-10 mx-4 mt-2 rounded-[12px]">
        <Line
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                ...options.plugins.title,
                text: '일반 선 그래프 차트',
              },
            },
          }}
          data={lineData}
        />
      </div>
    </>
  );
}

export default ChartEx;
