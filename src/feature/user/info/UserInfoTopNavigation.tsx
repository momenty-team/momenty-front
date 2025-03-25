'use client';

import TopNavigation from '@/common/components/TopNavigation';
import { useRouter } from 'next/navigation';

type CurrentPath = 'edit' | 'info';
interface UserInfoTopNavigationProps {
  isEditMode?: boolean;
  currentPath: CurrentPath;
}

function UserInfoTopNavigation({ isEditMode = false, currentPath }: UserInfoTopNavigationProps) {
  const router = useRouter();

  const onClickBackButton = (currentPath: CurrentPath) => {
    if (currentPath === 'edit') {
      router.push('/user/info');
    }
    if (currentPath === 'info') {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ route: 'goBack' }));
      }
    }
  };

  return (
    <TopNavigation onClickBack={() => onClickBackButton(currentPath)} backGroundColor="transparent">
      {isEditMode && (
        <div className="text-body-1-r" onClick={() => router.push('/user/info/edit')}>
          수정
        </div>
      )}
    </TopNavigation>
  );
}

export default UserInfoTopNavigation;
