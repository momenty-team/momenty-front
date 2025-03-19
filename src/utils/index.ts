import type { BridgeData } from '@/types';

export const postMessageToWebView = (bridgeData: BridgeData) => {
  try {
    if (window.ReactNativeWebView) {
      return window.ReactNativeWebView.postMessage(JSON.stringify(bridgeData));
    }

    throw new Error('window.ReactNativeWebView가 존재하지 않습니다.');
  } catch (error) {
    console.error('postMessageToWebView post message failed');
    console.error(error);
  }
};

export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const targetTime = new Date(timestamp);
  const diffMs = now.getTime() - targetTime.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;
  return "하루 넘음";
}
