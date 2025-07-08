import { suitFont } from '@/styles/font';
import { cookies } from 'next/headers';

interface UsersInfo {
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

async function UserInfo() {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch('https://api.momenty.co.kr/users/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
  });

  if (!response.ok) {
    throw new Error('데이터를 가져오지 못했습니다.');
  }

  const { name, nickname, birth_date, email, gender }: UsersInfo = await response.json();

  return (
    <>
      <main className={`flex flex-col items-center gap-5 mt-12 ${suitFont.className}`}>
        <section className="flex flex-col w-full">
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">이름</span>
            <span className="text-body-1-m text-indigo-300">{name}</span>
          </div>
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">닉네임</span>
            <span className="text-body-1-m text-indigo-300">{nickname}</span>
          </div>
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">생년월일</span>
            <span className="text-body-1-m text-indigo-300">{birth_date}</span>
          </div>
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">이메일 주소</span>
            <span className="text-body-1-m text-indigo-300">{email}</span>
          </div>
          <div className="flex justify-between align-center px-8 py-2">
            <span className="text-body-1-m text-indigo-300">성별</span>
            <span className="text-body-1-m text-indigo-300">{gender}</span>
          </div>
        </section>
      </main>
    </>
  );
}

export default UserInfo;
