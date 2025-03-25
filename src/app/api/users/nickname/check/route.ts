import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const nickname = searchParams.get('nickname');
  const cookieHeader = (await cookies()).toString();

  if (!nickname) {
    return new Response(JSON.stringify({ message: '닉네임이 필요합니다.' }), { status: 400 });
  }

    const res = await fetch(`https://api.momenty.co.kr/users/nickname/check?nickname=${encodeURIComponent(nickname)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader || '',
      },
    });

  return res;
}
