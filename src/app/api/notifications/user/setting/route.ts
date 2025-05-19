import { cookies } from 'next/headers';

export async function GET() {
  const cookieHeader = (await cookies()).toString();

  const res = await fetch('https://api.momenty.co.kr/notifications/user/setting', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
  });

  return res;
}

export async function PUT(req: Request) {
  const cookieHeader = (await cookies()).toString();
  const body = await req.json();

  const res = await fetch(`https://api.momenty.co.kr/notifications/user/setting`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify({
      notification_type_id: body.notification_type_id,
      is_enabled: body.is_enabled,
    }),
  });

  return res;
}
