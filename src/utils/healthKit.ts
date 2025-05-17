import type { CustomHealthValue } from '@/types';

export function formatKoreanDate(dateInput: string | Date): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return '유효하지 않은 날짜';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}

export function calculateAverageValue(data: CustomHealthValue[]): number | null {
  if (!Array.isArray(data) || data.length === 0) return null;

  const validValues = data.map((item) => item.value).filter((value) => typeof value === 'number' && !isNaN(value));

  if (validValues.length === 0) return null;

  const sum = validValues.reduce((acc, val) => acc + val, 0);
  const avg = sum / validValues.length;

  return avg;
}
