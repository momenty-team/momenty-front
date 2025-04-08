'use client';

import TimePicker from '@/common/components/TimePicker';
import Toggle from '@/common/components/Toggle';
import useLockScroll from '@/common/hooks/useLockScroll';
import ButtonLoadingIndicator from '@/common/components/ButtonLoadingIndicator';
import { postMessageToWebView } from '@/utils/webview';
import { useState } from 'react';
import type { RecordDetail } from '@/types/apis/records';
import CircleIcon from '@/assets/svg/log-detail/circle.svg';
import CloseIcon from '@/assets/svg/log-detail/close.svg';

interface LogSettingDetailProps {
  id: string;
  detailId: string;
  type: string;
  recordDetail: RecordDetail;
}

function LogSettingDetail({ id, detailId, type, recordDetail }: LogSettingDetailProps) {
  const hour = new Date(recordDetail.created_at).getHours();
  const minute = new Date(recordDetail.created_at).getMinutes();
  const [time, setTime] = useState({ hour, minute });
  const [isToggled, setIsToggled] = useState(recordDetail.is_public);
  const [loading, setLoading] = useState(false);
  const [checkedOptionIdList, setCheckedOptionIdList] = useState<string[]>([]);
  console.log('LogSettingDetail', { id, detailId, type });

  const handleToggle = (value: boolean) => {
    setIsToggled(value);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await fetch(`/api/records/${id}/details/${detailId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      postMessageToWebView({ toast: { type: 'success', message: '기록을 삭제했어요.' }, route: 'goBack' });
    } catch (error) {
      postMessageToWebView({ toast: { type: 'error', message: '기록을 삭제하지 못했어요.' } });
    } finally {
      setLoading(false);
    }
  };

  useLockScroll(true);

  const handleCheckedLog: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, id } = e.target;

    if (checked) {
      setCheckedOptionIdList((prev) => [...prev, id]);
    } else {
      setCheckedOptionIdList((prev) => prev.filter((optionId) => optionId !== id));
    }
  };

  return (
    <>
      <TimePicker
        initialHour={time.hour}
        initialMinute={time.minute}
        getHour={(hour) => setTime((p) => ({ hour, minute: p.minute }))}
        getMinute={(minute) => setTime((p) => ({ hour: p.hour, minute }))}
      />

      <div className="flex flex-col w-full h-[calc(100vh-288px)] max-h-[calc(100vh-300px)] pt-4 justify-between gap-2">
        <div className="gap-3 flex flex-col h-full">
          <div className="flex gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 justify-between">
            <span className="text-body-3-m">기록명</span>
            <input className="text-label-1-r bg-indigo-5 text-indigo-300 text-end" value={'고등어'} disabled />
          </div>
          {type === 'text' && (
            <button type="button" className="flex flex-col gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 flex-1 min-h-0">
              <span className="text-body-3-m">기록</span>
              <div className="text-left w-full text-label-1-r bg-indigo-5 text-indigo-300 flex-1 min-h-0 overflow-y-auto">
                {recordDetail.content}
              </div>
            </button>
          )}
          {type === 'boolean' && (
            <div className="flex flex-col gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 flex-1 min-h-0">
              <span className="text-body-3-m">기록</span>
              <div className="flex items-end w-full gap-4 h-full">
                <button
                  type="button"
                  className="flex items-center justify-center w-full h-full bg-[#A5D0FE]  rounded-[4px] text-caption-3-sb text-indigo-300"
                  onClick={() => {}}
                >
                  <CircleIcon width={28} height={28} />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-full h-full bg-[#EC7B8E] rounded-[4px] text-caption-3-sb text-indigo-300"
                  onClick={() => {}}
                >
                  <CloseIcon width={28} height={28} />
                </button>
              </div>
            </div>
          )}
          {type === 'option' && (
            <button type="button" className="flex flex-col gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 flex-1 min-h-0">
              <span className="text-body-3-m">기록</span>
              <div className="flex gap-4 text-left w-full text-label-1-r bg-indigo-5 text-indigo-300 flex-1 min-h-0">
                {recordDetail.content.map((option) => (
                  <label
                    htmlFor={String(option)}
                    key={option}
                    className={`flex py-1.5 px-3 rounded-[8px] bg-indigo-100 text-body-2-sb text-indigo-5 w-fit h-fit ${
                      checkedOptionIdList.includes(String(id)) ? 'bg-indigo-700 text-indigo-5' : 'text-indigo-100'
                    }`}
                  >
                    <input
                      id={String(option)}
                      type="checkbox"
                      className="peer hidden"
                      value={option}
                      checked={checkedOptionIdList.includes(String(option))}
                      onChange={handleCheckedLog}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </button>
          )}
          {type === 'number' && (
            <button type="button" className="flex flex-col gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 flex-1 min-h-0">
              <span className="text-body-3-m">기록</span>
              <div className="text-right w-full text-display-3-el bg-indigo-5 text-indigo-300 flex-1 min-h-0 overflow-x-scroll whitespace-nowrap">
                {recordDetail.content}
              </div>
            </button>
          )}
          <div className="flex justify-between  bg-indigo-5 rounded-[8px] px-4 py-4">
            <div className="flex flex-col gap-1">
              <span className="text-body-3-m ">외부 공개 여부</span>
              <span className="text-label-1-r text-indigo-300">친구들에게 나의 레이블을 공유해요!</span>
            </div>
            <Toggle onChange={handleToggle} checked={isToggled} />
          </div>
          <div className="flex justify-between bg-indigo-5 rounded-[8px] px-4 py-4">
            <div className="flex flex-col gap-1">
              <span className="text-body-3-m ">기록 삭제하기</span>
              <span className="text-label-1-r text-indigo-300">기록을 영구적으로 삭제해요.</span>
            </div>
            {/* 모달 추가 */}
            <button
              className="flex px-3 py-2 rounded-[8px] bg-indigo-700 text-white text-body-3-sb items-center justify-center"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? <ButtonLoadingIndicator /> : '삭제하기'}
            </button>
          </div>
          <button
            // onClick={onNext}
            className={
              'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 disabled:bg-indigo-50 rounded-[8px]'
            }
            // disabled={!unit.trim()}
          >
            저장하기
          </button>
        </div>
      </div>
    </>
  );
}

export default LogSettingDetail;
