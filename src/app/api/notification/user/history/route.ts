import { NextResponse } from 'next/server';

interface Response {
  user_notification_histories: Array<{
    id: number;
    title: string;
    content: string;
    icon_url: string;
    is_read: boolean;
  }>;
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie');

  const response = await fetch('https://api.momenty.co.kr/notification/user/history', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader || "" },
  });

  if (!response.ok) {
    return NextResponse.json({ error: '데이터를 가져오지 못했습니다.' }, { status: response.status });
  }

  const data: Response = await response.json();

  return NextResponse.json(data);
}
