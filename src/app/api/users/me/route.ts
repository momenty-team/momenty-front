import { NextResponse } from "next/server";

interface Response {
  id: number;
  name: string;
  nickname: string;
  birth_date: string;
  email: string;
  profile_image_url: string;
  gender: string;
  is_public: boolean;
  follower_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export async function GET(req: Request) { 
  const cookieHeader = req.headers.get('cookie');

  const response = await fetch('https://api.momenty.co.kr/users/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader || "" },
  });

  if (!response.ok) {
    return NextResponse.json({ error: '데이터를 가져오지 못했습니다.' }, { status: response.status });
  }

  const data: Response = await response.json();

  return NextResponse.json(data);
}
