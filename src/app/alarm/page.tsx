'use client';

import { useEffect, useState } from 'react';

function Alarm() {
  const [alarmList, setAlarmList] = useState();

  useEffect(() => {
    fetch('/api/notification/user/history', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setAlarmList(data));
  }, []);

  return (
    <div>
      {JSON.stringify(alarmList, null, 2)}
      {/* {alarmList.map((alarm) => (
        <div key={alarm} className="flex gap-3 px-4 py-3 bg-indigo-5 w-full">
          <div className="min-w-4 h-4 bg-indigo-700 rounded-[2px]" />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-1 min-w-full gap-3 items-center justify-between">
              <span className="flex text-label-1-r">{alarm.title}</span>
              <div className="flex text-label-1-r">{alarm.time}</div>
            </div>
            <div className="flex text-label-1-r">{alarm.content}</div>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default Alarm;
