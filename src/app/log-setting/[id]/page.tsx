'use client';

import Toggle from '@/common/components/Toggle';
import { postMessageToWebView } from '@/utils/webview';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChevronRightIcon from '@/assets/svg/chevron-right.svg';

type OptionType = 'TEXT_TYPE' | 'BOOLEAN_TYPE' | 'OPTION_TYPE' | 'NUMBER_TYPE';

function LogDetail() {
  const route = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isToggled, setIsToggled] = useState(false);
  const [recordTitle, setRecordTitle] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<OptionType>();
  const [unit, setUnit] = useState<string>('');

  const handleToggle = (value: boolean) => {
    setIsToggled(value);
  };

  const navigateOptionSetting = () => {
    route.push(`/log-setting/${id}/add-option`);
  };

  const handleDelete = async () => {
    await fetch(`/api/records/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    postMessageToWebView({ toast: { type: 'success', message: '기록을 삭제했어요.' }, route: '/' });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await fetch(`/api/records/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: recordTitle,
          is_public: isToggled,
        }),
      });

      if (type === 'NUMBER_TYPE') {
        await fetch(`/api/records/${id}/unit`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ unit }),
        });
      }

      setLoading(false);
      postMessageToWebView({ toast: { type: 'success', message: '변경을 완료했어요.' } });
    } catch (error) {
      console.error('저장 실패:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params) {
      const fetchRecords = async () => {
        const res = await fetch(`/api/records/${id}/details`);
        if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
        const data = await res.json();
        setRecordTitle(data.title);
        setIsToggled(data.is_public);
        setType(data.method);
      };

      const fetchUnit = async () => {
        const res = await fetch(`/api/records/${id}/unit`);
        if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
        const data = await res.json();
        setUnit(data.unit);
      };

      fetchRecords();
      fetchUnit();
    }
  }, [params]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-48px)] justify-between pt-2 px-6">
      <div className="flex flex-col w-full h-full">
        <h1 className="text-subtitle-3-sb mb-3">기록 설정</h1>
        <span className="text-body-3-m text-indigo-300">기록에 관한 전반적인 내용을 수정합니다.</span>
        <div className="flex flex-col mt-4 gap-4">
          <div className="flex gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 justify-between">
            <span className="text-body-3-m">기록명</span>
            <input
              className="text-label-1-r bg-indigo-5 text-indigo-300 text-end"
              value={recordTitle}
              onChange={(e) => setRecordTitle(e.target.value)}
            />
          </div>

          {type === 'NUMBER_TYPE' && (
            <div className="flex gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 justify-between">
              <span className="text-body-3-m">단위</span>
              <input
                className="text-label-1-r bg-indigo-5 text-indigo-300 text-end"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          )}

          {type === 'OPTION_TYPE' && (
            <button
              type="button"
              onClick={navigateOptionSetting}
              className="flex gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 justify-between"
            >
              <span className="text-body-3-m">옵션 추가하기</span>
              <ChevronRightIcon width={26} height={26} className="flex [&>path]:stroke-indigo-100" />
            </button>
          )}

          <div className="flex justify-between  bg-indigo-5 rounded-[8px] px-4 py-4">
            <div className="flex flex-col gap-1">
              <span className="text-body-3-m ">외부 공개 여부</span>
              <span className="text-label-1-r text-indigo-300">친구들에게 나의 기록들을 공유해요!</span>
            </div>
            <Toggle onChange={handleToggle} />
          </div>
          <div className="flex justify-between bg-indigo-5 rounded-[8px] px-4 py-4">
            <div className="flex flex-col gap-1">
              <span className="text-body-3-m ">기록 삭제하기</span>
              <span className="text-label-1-r text-indigo-300">기록을 영구적으로 삭제해요.</span>
            </div>
            <button
              className="flex px-3 py-2 rounded-[8px] bg-indigo-700 text-white text-body-3-sb items-center"
              onClick={handleDelete}
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
      <button
        className="py-[14px] rounded-[8px] bg-indigo-700 text-indigo-5 text-body-3-b w-[calc(100vw-40px)] flex-none"
        onClick={handleSubmit}
        disabled={loading}
      >
        저장하기
      </button>
    </div>
  );
}

export default LogDetail;
