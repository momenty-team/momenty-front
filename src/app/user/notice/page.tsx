import NoticeList from './NoticeList';

function NoticePage() {
  return (
    <>
      <main className="w-full">
        <span className="text-subtitle-2-sb p-4 pt-4 pb-1">공지사항</span>
        <NoticeList />
      </main>
    </>
  );
}

export default NoticePage;
