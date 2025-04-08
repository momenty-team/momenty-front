import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(_: NextRequest, { params }: { params: { recordsId: string } }) {
  const { recordsId } = await params;
  const cookieHeader = (await cookies()).toString();
  
  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/unit`, {
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

export async function PUT(req: Request, { params }: { params: { recordsId: string } }) {
  const { recordsId } = await params;
  const cookieHeader = (await cookies()).toString();
  const body = await req.json();

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/unit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify({
      unit: body.unit,
    }),
  });

  revalidateTag('records');
  return res;
}
