import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function DELETE(req: Request, { params }: { params: { recordsId: string, detailId: string } }) {
  const { recordsId, detailId } = await params;
  const cookieHeader = (await cookies()).toString();

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/details/${detailId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    }
  });

  revalidateTag('recordsDetails');
  return res;
}

export async function PUT(req: Request, { params }: { params: { recordsId: string, detailId: string  } }) {
  const { recordsId, detailId } = await params;
  const cookieHeader = (await cookies()).toString();
  const body = await req.json();

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/details/${detailId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify(body),
  });

  revalidateTag('recordsDetails');
  return res;
}
