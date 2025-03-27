import { formatRelativeTime } from '@/utils/index';
import { cookies } from 'next/headers';
import BridgeConnection from '@/feature/alarm/BridgeConnection';

interface NotificationList {
  id: number;
  title: string;
  content: string;
  icon_url: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

interface UserNotificationHistories {
  user_notification_histories: NotificationList[];
}

async function Alarm() {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch('https://api.momenty.co.kr/notification/user/history', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
  });

  if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');

  const { user_notification_histories: notificationList }: UserNotificationHistories = await response.json();

  return (
    <>
      {notificationList.map(({ id, title, content, created_at }) => (
        <div key={id} className="flex gap-3 px-4 py-3 bg-indigo-5 w-full">
          <div className="min-w-4 h-4 bg-indigo-700 rounded-[2px]" />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-1 min-w-full gap-3 items-center justify-between">
              <span className="flex text-label-1-r">{title}</span>
              <div className="flex text-label-1-r">{formatRelativeTime(created_at)}</div>
            </div>
            <div className="flex text-label-1-r">{content}</div>
          </div>
        </div>
      ))}
      <BridgeConnection />
    </>
  );
}

export default Alarm;
