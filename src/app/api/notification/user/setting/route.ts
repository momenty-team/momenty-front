import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  const response = await fetch('https://api.momenty.co.kr/notification/user/setting', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader || "" },
    });

  const data = await response.json();

  if (!data) {
    return NextResponse.json({ error: '데이터를 가져오지 못했습니다.' }, { status: 500 });
  }

  return NextResponse.json(data);
}
