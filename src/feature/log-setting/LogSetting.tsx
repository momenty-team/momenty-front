'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Toggle from '@/common/components/Toggle';
import { postMessageToWebView } from '@/utils/webview';
import ChevronRightIcon from '@/assets/svg/chevron-right.svg';

import type { LogRecord } from '@/types/apis/records';

interface LogSettingProps {
  title: string;
  method: LogRecord['method'];
  isPublic: boolean;
  unit?: string;
}

function LogSetting({ title, method, isPublic, unit }: LogSettingProps) {
  const route = useRouter();
  const { id } = useParams();
  const [recordTitle, setRecordTitle] = useState<string>(title);
  const [currentUnit, setCurrentUnit] = useState(unit);
  const [isToggled, setIsToggled] = useState(isPublic);
  const [loading, setLoading] = useState(false);

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

      if (method === 'NUMBER_TYPE') {
        await fetch(`/api/records/${id}/unit`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ unit: currentUnit }),
        });
      }

      route.refresh();
      setLoading(false);
      postMessageToWebView({ toast: { type: 'success', message: '변경을 완료했어요.' } });
    } catch (error) {
      console.error('저장 실패:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col mt-4 gap-4">
          <div className="flex gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 justify-between">
            <span className="text-body-3-m">기록명</span>
            <input
              className="text-label-1-r bg-indigo-5 text-indigo-300 text-end"
              value={recordTitle}
              onChange={(e) => setRecordTitle(e.target.value)}
            />
          </div>

          {method === 'NUMBER_TYPE' && (
            <div className="flex gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 justify-between">
              <span className="text-body-3-m">단위</span>
              <input
                className="text-label-1-r bg-indigo-5 text-indigo-300 text-end"
                value={currentUnit}
                onChange={(e) => setCurrentUnit(e.target.value)}
              />
            </div>
          )}

          {method === 'OPTION_TYPE' && (
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
            <Toggle onChange={handleToggle} checked={isPublic} />
          </div>
          <div className="flex justify-between bg-indigo-5 rounded-[8px] px-4 py-4">
            <div className="flex flex-col gap-1">
              <span className="text-body-3-m ">기록 삭제하기</span>
              <span className="text-label-1-r text-indigo-300">기록을 영구적으로 삭제해요.</span>
            </div>
            {/* 모달 추가 */}
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
        className={
          'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 disabled:bg-indigo-50 rounded-[8px]'
        }
        onClick={handleSubmit}
        disabled={loading}
      >
        저장하기
      </button>
    </>
  );
}

export default LogSetting;
