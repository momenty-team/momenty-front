'use client';

import TopNavigation from '@/common/components/TopNavigation';
import { postMessageToWebView } from '@/utils';

const NOTICE_LIST = [
  {
    id: 1,
    title: '[업데이트] 모먼트에 공지사항 페이지가 생겼어요!',
    date: '2월 19일 수',
  },
  {
    id: 2,
    title: '[업데이트] 모먼트에 새로운 친구가 등장했어요!',
    date: '2월 19일 수',
  },
  {
    id: 3,
    title: '[업데이트] 모먼티에 새로운 기능이 추가되었어요! 그것은 뭐냐면요 두구두구두구 로그 추가 기능입니다 따란~',
    date: '2월 19일 수',
  },
  {
    id: 4,
    title: '[공지사항] 모먼트 이용약관을 확인해주세요',
    date: '2월 19일 수',
  },
  {
    id: 5,
    title: '[업데이트] 모먼트에 공지사항 페이지가 생겼어요!',
    date: '2월 19일 수',
  },
  {
    id: 6,
    title: '[업데이트] 모먼트에 공지사항 페이지가 생겼어요!',
    date: '2월 19일 수',
  },
  {
    id: 7,
    title: '[업데이트] 모먼트에 공지사항 페이지가 생겼어요!',
    date: '2월 19일 수',
  },
  {
    id: 8,
    title: '[업데이트] 모먼트에 공지사항 페이지가 생겼어요!',
    date: '2월 19일 수',
  },
  {
    id: 9,
    title: '[업데이트] 모먼트에 공지사항 페이지가 생겼어요!',
    date: '2월 19일 수',
  },
  {
    id: 10,
    title: '[업데이트] 모먼트에 공지사항 페이지가 생겼어요!',
    date: '2월 19일 수',
  },
  {
    id: 11,
    title: '[업데이트] 모먼트에 공지사항 페이지가 생겼어요!',
    date: '2월 19일 수',
  },
];

function NoticePage() {
  return (
    <>
      <TopNavigation onClickBack={() => postMessageToWebView({ route: 'goBack' })} />
      <main className="w-full mt-16">
        <span className="text-subtitle-2-sb p-4 pt-4 pb-1">공지사항</span>
        <div>
          {NOTICE_LIST.map((notice) => (
            <div key={notice.id} className="py-4 px-5">
              <div className="text-body-4-m">{notice.title}</div>
              <div className="text-label-1-el text-indigo-200">{notice.date}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default NoticePage;
