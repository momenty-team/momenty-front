import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function PUT(req: Request, { params }: { params: { recordsId: string } }) {
  const { recordsId } = await params;
  const cookieHeader = (await cookies()).toString();
  const body = await req.json();

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify({
      title: body.title,
      is_public: body.is_public,
    }),
  });

  revalidateTag('records');
  return res;
}

export async function DELETE(req: Request, { params }: { params: { recordsId: string } }) {
  const { recordsId } = await params;
  const cookieHeader = (await cookies()).toString();

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    }
  });

  revalidateTag('records');
  return res;
}
