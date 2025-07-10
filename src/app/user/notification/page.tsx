import NotificationList from '@/feature/notification/NotificationList';

function NotificationPage() {
  return (
    <main className="w-full pb-12">
      <span className="text-subtitle-2-sb pl-4">알람 설정</span>
      <div className="px-6">
        <NotificationList />
      </div>
    </main>
  );
}

export default NotificationPage;
