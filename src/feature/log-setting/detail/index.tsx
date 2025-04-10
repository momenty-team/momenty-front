'use client';

import TimePicker from '@/common/components/TimePicker';
import Toggle from '@/common/components/Toggle';
import useLockScroll from '@/common/hooks/useLockScroll';
import ButtonLoadingIndicator from '@/common/components/ButtonLoadingIndicator';
import { postMessageToWebView } from '@/utils/webview';
import { useState } from 'react';
import type { Option, RecordDetail } from '@/types/apis/records';
import CircleIcon from '@/assets/svg/log-detail/circle.svg';
import CloseIcon from '@/assets/svg/log-detail/close.svg';
import NumberPad from '@/common/components/NumberPad';

interface LogSettingDetailProps {
  id: string;
  detailId: string;
  type: string;
  recordDetail: RecordDetail;
  options?: Option[];
}

function LogSettingDetail({ id, detailId, type, recordDetail, options }: LogSettingDetailProps) {
  const hour = new Date(recordDetail.created_at).getHours();
  const minute = new Date(recordDetail.created_at).getMinutes();

  const [time, setTime] = useState({ hour, minute });
  const [isToggled, setIsToggled] = useState(recordDetail.is_public);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [openNumber, setOpenNumber] = useState(false);
  const [recordDetailContent, setRecordDetailContent] = useState<string[]>(recordDetail.content);
  const [currentNumber, setCurrentNumber] = useState<string>(recordDetail.content[0].split(' ')[0]);

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
      console.error(error);
      postMessageToWebView({ toast: { type: 'error', message: '기록을 삭제하지 못했어요.' } });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      await fetch(`/api/records/${id}/details/${detailId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: type === 'number' ? currentNumber : recordDetailContent.join(','),
          is_public: isToggled,
          hour: time.hour,
          minute: time.minute,
        }),
      });

      postMessageToWebView({ toast: { type: 'success', message: '기록을 수정했어요.' }, route: 'goBack' });
    } catch (error) {
      console.error('저장 실패:', error);
      postMessageToWebView({ toast: { type: 'error', message: '기록을 수정하지 못했어요.' } });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCheckedLog: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, id } = e.target;

    if (checked) {
      setRecordDetailContent((prev) => [...prev, id]);
    } else {
      setRecordDetailContent((prev) => prev.filter((optionId) => optionId !== id));
    }
  };

  useLockScroll(true);

  return (
    <>
      <TimePicker
        initialHour={time.hour}
        initialMinute={time.minute}
        getHour={(hour) => setTime((p) => ({ hour, minute: p.minute }))}
        getMinute={(minute) => setTime((p) => ({ hour: p.hour, minute }))}
      />

      <div
        className="flex flex-col w-full max-h-[calc(100vh-300px)] justify-between gap-2"
        style={{ height: openNumber ? '100%' : 'calc(100vh - 288px)' }}
      >
        <div className="gap-3 flex flex-col h-full">
          {!openNumber && (
            <div className="flex gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 justify-between">
              <span className="text-body-3-m">기록명</span>
              <input
                className="text-label-1-r bg-indigo-5 text-indigo-300 text-end"
                value={recordDetail.record_title}
                disabled
              />
            </div>
          )}
          {type === 'text' && (
            <button type="button" className="flex flex-col gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 flex-1 min-h-0">
              <span className="text-body-3-m">기록</span>
              <textarea
                className="text-left w-full text-label-1-r bg-indigo-5 text-indigo-300 flex-1 min-h-0 overflow-y-auto"
                value={recordDetailContent[0] || ''}
                onChange={(e) => setRecordDetailContent([e.target.value])}
              />
            </button>
          )}
          {type === 'boolean' && (
            <div className="flex flex-col gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 flex-1 min-h-0">
              <div className="flex w-full justify-between items-center">
                <span className="text-body-3-m">기록</span>
                <span className="text-label-1-r w-11">현재 : {recordDetailContent[0]}</span>
              </div>
              <div className="flex items-end w-full gap-4 h-full">
                <button
                  type="button"
                  className="flex items-center justify-center w-full h-full bg-[#A5D0FE] rounded-[4px] text-caption-3-sb text-indigo-300"
                  onClick={() => setRecordDetailContent(['O'])}
                >
                  <CircleIcon width={28} height={28} />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-full h-full bg-[#EC7B8E] rounded-[4px] text-caption-3-sb text-indigo-300"
                  onClick={() => setRecordDetailContent(['X'])}
                >
                  <CloseIcon width={28} height={28} />
                </button>
              </div>
            </div>
          )}
          {type === 'option' && options && (
            <div className="flex flex-col gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 flex-1 min-h-0">
              <span className="text-body-3-m">기록</span>
              <div className="flex gap-2 text-left w-full text-label-1-r bg-indigo-5 text-indigo-300 flex-1 min-h-0 flex-wrap overflow-y-scroll">
                {options.map(({ id, option }) => (
                  <label
                    htmlFor={String(id)}
                    key={id}
                    className={`flex py-1.5 px-3 rounded-[8px] bg-indigo-100 text-body-2-sb text-indigo-5 w-fit h-fit whitespace-nowrap ${
                      recordDetailContent.includes(String(id)) ? 'bg-indigo-700 text-indigo-5' : 'text-indigo-100'
                    }`}
                  >
                    <input
                      id={String(id)}
                      type="checkbox"
                      className="peer hidden"
                      value={option}
                      checked={recordDetailContent.includes(String(id))}
                      onChange={handleCheckedLog}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {type === 'number' && (
            <button
              type="button"
              className="flex flex-col gap-2 bg-indigo-5 rounded-[8px] px-4 py-4 min-h-0"
              onClick={() => setOpenNumber(true)}
            >
              <span className="text-body-3-m">기록</span>
              <div className="text-right w-full text-display-3-el bg-indigo-5 text-indigo-300 flex-1 min-h-0 overflow-x-auto whitespace-nowrap">
                {currentNumber} {recordDetail.content[0].split(' ')[1]}
              </div>
              <span className="text-label-1-r text-indigo-300"></span>
            </button>
          )}
          {!openNumber && (
            <>
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

                <button
                  className="flex px-3 py-2 rounded-[8px] bg-indigo-700 text-white text-body-3-sb items-center justify-center"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? <ButtonLoadingIndicator /> : '삭제하기'}
                </button>
              </div>
              <button
                onClick={handleSave}
                className={
                  'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 disabled:bg-indigo-50 rounded-[8px]'
                }
                disabled={saveLoading}
              >
                {saveLoading ? <ButtonLoadingIndicator /> : '저장하기'}
              </button>
            </>
          )}
        </div>
        {openNumber && (
          <NumberPad
            NumberPadValue={currentNumber}
            setNumberPadValue={setCurrentNumber}
            onClickSave={() => {
              setOpenNumber(false);
              handleSave();
            }}
          />
        )}
      </div>
    </>
  );
}

export default LogSettingDetail;
