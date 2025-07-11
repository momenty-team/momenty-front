import licenses from '../../../../licenses.json';

export interface LicenseInfo {
  licenses: string;
  repository?: string;
  publisher?: string;
  path: string;
  licenseFile?: string;
  email?: string;
  url?: string;
  private?: boolean;
}

const OPEN_SOURCE_LIST = Object.entries(licenses).map(([pkg, info]: [string, LicenseInfo]) => {
  const id = pkg;
  const title = `${pkg} (${info.licenses})`;
  const link = info.repository ?? '링크 없음';
  return { id, title, link };
});

function OpenSourcePage() {
  return (
    <main className="w-full">
      <span className="text-subtitle-2-sb pl-4">오픈소스 라이선스</span>
      <div>
        {OPEN_SOURCE_LIST.map((notice) => (
          <div key={notice.id} className="py-4 px-6 break-all">
            <div className="text-body-3-m text-indigo-300">{notice.title}</div>
            <div className="text-body-4-el text-[#59A7FC]">{notice.link}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default OpenSourcePage;
