import UserInfoTopNavigation from '@/feature/user/info/UserInfoTopNavigation';
import { suitFont } from '@/styles/font';
import { cookies } from 'next/headers';
import UserInfoEditForm from './UserInfoEditForm';

async function UserInfoEdit() {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch('https://api.momenty.co.kr/users/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
  });

  if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.');

  const userInfo = await response.json();

  return (
    <>
      <UserInfoTopNavigation currentPath="edit" />
      <main className={`flex flex-col gap-5 pt-12 ${suitFont.className}`}>
        <UserInfoEditForm userInfo={userInfo} />
      </main>
    </>
  );
}

export default UserInfoEdit;
