import { cookies } from 'next/headers';

interface NoticeList {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

async function NoticeList() {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch('https://api.momenty.co.kr/notices', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
  });

  if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');

  const { notices }: { notices: NoticeList[] } = await response.json();

  const extractDate = (isoString: string): string => {
    return isoString.split('T')[0];
  };

  return (
    <div>
      {notices.map(({ id, title, created_at }) => (
        <div key={id} className="py-4 px-6">
          <div className="text-body-4-m">{title}</div>
          <div className="text-label-1-el text-indigo-200">{extractDate(created_at)}</div>
        </div>
      ))}
    </div>
  );
}

export default NoticeList;
