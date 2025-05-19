'use client';

import Toggle from '@/common/components/Toggle';
import { useEffect, useState } from 'react';

interface Notifications {
  id: number;
  title: string;
  content: string;
  icon_url: string;
}

interface NotificationData {
  notifications: Notifications[];
}

interface UserNotificationSettingDtos {
  notification_type_id: number;
  notification_type: string;
}

interface ActiveNotifications {
  user_notification_setting_dtos: UserNotificationSettingDtos[];
}

function NotificationList() {
  const [notificationData, setNotificationData] = useState<Notifications[]>([]);
  const [activeNotificationData, setActiveNotificationData] = useState<UserNotificationSettingDtos[]>([]);

  const getNotificationList = async () => {
    const res = await fetch('/api/notifications');
    if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
    const data: NotificationData = await res.json();
    setNotificationData(data.notifications);
  };

  const activeNotification = async () => {
    const res = await fetch('/api/notifications/user/setting');
    if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
    const data: ActiveNotifications = await res.json();
    setActiveNotificationData(data.user_notification_setting_dtos);
  };

  const handleToggle = async (id: number, isEnabled: boolean) => {
    const res = await fetch(`/api/notifications/user/setting`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notification_type_id: id,
        is_enabled: !isEnabled,
      }),
    });
    if (!res.ok) throw new Error('데이터를 업데이트하는 데 실패했습니다.');
    activeNotification();
  };

  useEffect(() => {
    getNotificationList();
    activeNotification();
  }, []);

  const isSame = (title: string) => {
    return activeNotificationData.some((active) => active.notification_type === title);
  };

  return (
    <div className="flex flex-col gap-3 mt-6">
      {notificationData.map(({ id, title }) => (
        <div key={id} className="flex justify-between items-center bg-indigo-5 rounded-[8px] px-4 py-5">
          <span className="text-body-3-m">{title}</span>
          <Toggle checked={isSame(title)} onChange={() => handleToggle(id, isSame(title))} />
        </div>
      ))}
    </div>
  );
}

export default NotificationList;
