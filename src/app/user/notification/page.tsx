'use client';

import Toggle from '@/common/components/Toggle';
import { useEffect, useState } from 'react';

interface UserNotificationSettingDtos {
  notification_type: string;
  notification_type_id: number;
}

interface NotificationData {
  user_notification_setting_dtos: UserNotificationSettingDtos[];
}

function PrivacyPage() {
  const [notificationData, setNotificationData] = useState<UserNotificationSettingDtos[]>([]);

  const fetchRecords = async () => {
    const res = await fetch('/api/notifications/user/setting');
    if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
    const data: NotificationData = await res.json();
    setNotificationData(data.user_notification_setting_dtos);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <main className="w-full pb-12">
      <span className="text-subtitle-2-sb p-4 pt-4 pb-1">알림 설정</span>
      <div className="px-4">
        <p className="text-body-3-m mt-4 text-indigo-300">
          여기서 끄면 비슷한 내용의 휴대폰 앱 알림은 보내지 않아요. 하지만 모먼티 내의 알림창에서는 확인할 수 있어요.
        </p>

        <div className="flex flex-col gap-3 mt-6">
          {notificationData.map(({ notification_type_id, notification_type }) => (
            <div
              key={notification_type_id}
              className="flex justify-between items-center bg-indigo-5 rounded-[8px] px-4 py-5"
            >
              <span className="text-body-3-m">{notification_type}</span>
              <Toggle checked={true} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default PrivacyPage;
