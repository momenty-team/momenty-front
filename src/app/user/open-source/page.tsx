'use client';

function OpenSourcePage() {
  const OPEN_SOURCE_LIST = [
    {
      id: 1,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 2,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 3,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 4,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 5,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 6,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 7,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 8,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 9,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 10,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
    {
      id: 11,
      title: '* Accompanist-pager :',
      link: 'https://google.github.io/accpmpanist.pager',
    },
  ];

  return (
    <>
      <main className="w-full">
        <span className="text-subtitle-2-sb p-4 pt-4 pb-1">오픈소스 라이선스</span>
        <div>
          {OPEN_SOURCE_LIST.map((notice) => (
            <div key={notice.id} className="py-4 px-5">
              <div className="text-body-3-m text-indigo-300">{notice.title}</div>
              <div className="text-body-4-el text-[#59A7FC]">{notice.link}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default OpenSourcePage;
