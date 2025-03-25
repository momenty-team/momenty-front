import NoticeList from './NoticeList';
import NoticeTopNavigation from '@/feature/notice/NoticeTopNavigation';

function NoticePage() {
  return (
    <>
      <NoticeTopNavigation />
      <main className="w-full mt-16">
        <span className="text-subtitle-2-sb p-4 pt-4 pb-1">공지사항</span>
        <NoticeList />
      </main>
    </>
  );
}

export default NoticePage;
