'use client';

import TopNavigation from '@/common/components/TopNavigation';
import { useRouter } from 'next/navigation';

interface UserInfoTopNavigationProps {
  isEditMode?: boolean;
}

function UserInfoTopNavigation({ isEditMode = false }: UserInfoTopNavigationProps) {
  const router = useRouter();

  const onClickBackButton = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ route: 'goBack' }));
    }
  };

  return (
    <TopNavigation onClickBack={onClickBackButton} backGroundColor="transparent">
      {isEditMode && (
        <div className="text-body-1-r" onClick={() => router.push('/user/info/edit')}>
          수정
        </div>
      )}
    </TopNavigation>
  );
}

export default UserInfoTopNavigation;
