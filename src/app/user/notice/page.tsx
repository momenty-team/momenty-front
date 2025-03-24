'use client';

import TopNavigation from '@/common/components/TopNavigation';
import { postMessageToWebView } from '@/utils/webview';
import { useEffect, useState } from 'react';

interface NoticeList {
  id: number;
  title: string;
  content: string;
  icon_url: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

function NoticePage() {
  const [notice, setNotice] = useState<NoticeList[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('/api/notices');
        if (!res.ok) {
          throw new Error('데이터를 가져오지 못했습니다.');
        }

        const data = await res.json();
        setNotice(data.notices);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotices();
  }, []);

  const extractDate = (isoString: string): string => {
    return isoString.split('T')[0];
  };

  return (
    <>
      <TopNavigation onClickBack={() => postMessageToWebView({ route: 'goBack' })} />
      <main className="w-full mt-16">
        <span className="text-subtitle-2-sb p-4 pt-4 pb-1">공지사항</span>
        <div>
          {notice.map(({ id, title, created_at }) => (
            <div key={id} className="py-4 px-5">
              <div className="text-body-4-m">{title}</div>
              <div className="text-label-1-el text-indigo-200">{extractDate(created_at)}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default NoticePage;
