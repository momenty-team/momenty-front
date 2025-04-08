const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const RELATIVE_TIME_LABELS = {
  justNow: "방금 전",
  minutesAgo: (n: number) => `${n}분 전`,
  hoursAgo: (n: number) => `${n}시간 전`,
  daysAgo: (n: number) => `${n}일 전`,
  overAWeek: "하루 넘음",
};

export function formatRelativeTime(timestamp: string) {
  const now = new Date().getTime();
  const targetTime = new Date(timestamp).getTime();
  const elapsedTime = now - targetTime;

  if (elapsedTime < MINUTE) return RELATIVE_TIME_LABELS.justNow;
  if (elapsedTime < HOUR) return RELATIVE_TIME_LABELS.minutesAgo(Math.floor(elapsedTime / MINUTE));
  if (elapsedTime < DAY) return RELATIVE_TIME_LABELS.hoursAgo(Math.floor(elapsedTime / HOUR));
  if (elapsedTime < WEEK) return RELATIVE_TIME_LABELS.daysAgo(Math.floor(elapsedTime / DAY));
  return RELATIVE_TIME_LABELS.overAWeek;
}

export const getCurrentTimeHHMM = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');  // '00' 형태로
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
