import NotificationList from '@/feature/notification/NotificationList';

function NotificationPage() {
  return (
    <main className="w-full pb-12">
      <span className="text-subtitle-2-sb pl-4">알람 설정</span>
      <div className="px-6">
        <p className="text-body-3-m mt-4 text-indigo-300">
          여기서 끄면 비슷한 내용의 휴대폰 앱 알람은 보내지 않아요. 하지만 모먼티 내의 알람창에서는 확인할 수 있어요.
        </p>
        <NotificationList />
      </div>
    </main>
  );
}

export default NotificationPage;
