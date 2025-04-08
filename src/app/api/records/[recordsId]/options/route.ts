import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { recordsId: string } }) {
  const { recordsId } = await params;
  const cookieHeader = (await cookies()).toString();
  
  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/options`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    next: {
      tags: ['recordsDetails'],
    },
    cache: 'no-store',
  });

  return res;
}

export async function POST(req: Request, { params }: { params: { recordsId: string } }) {
  const { recordsId } = await params;
  const cookieHeader = (await cookies()).toString();
  const body = await req.json();

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/options`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify({
      options: body.options,
    }),
  });

  revalidateTag('recordsDetails');
  return res;
}
