import { cookies } from 'next/headers';

export const UserClient = {
  get: async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const cookieHeader = (await cookies()).toString();
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      const message = await res.text().catch(() => '');
      console.error(`GET 요청 실패 (${res.status}):`, message);
      throw new Error('데이터를 가져오지 못했습니다.');
    }

    try {
      return await res.json();
    } catch (err) {
      console.error('JSON 파싱 오류:', err);
      throw new Error('응답을 처리하는 중 문제가 발생했습니다.');
    }
  },

  post: async <T>(url: string, body: any): Promise<T> => {
    const cookieStore = cookies();
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!res.ok) {
      const message = await res.text().catch(() => '');
      console.error(`POST 요청 실패 (${res.status}):`, message);
      throw new Error('요청에 실패했습니다.');
    }

    return await res.json();
  },
};
