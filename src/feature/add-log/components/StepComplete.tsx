'use client';

import { postMessageToWebView } from '@/utils/webview';
import { useFormContext } from 'react-hook-form';

function StepComplete() {
  const { getValues } = useFormContext();
  const formData = getValues();

  const handleSubmit = async () => {
    const formData = getValues();

    const recordDataForm = {
      title: formData.title,
      is_public: formData.is_public ?? true,
      method: formData.method,
      option: formData.option ?? [],
      unit: formData.unit || '',
    };

    try {
      await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordDataForm),
      });

      postMessageToWebView({ route: '/' });
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-4 px-6">
      <h1 className="mb-6 text-subtitle-1-b">
        이제 {formData.title}을(를)
        <br />
        기록할 수 있어요.
      </h1>
      <button
        onClick={handleSubmit}
        className={
          'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px]'
        }
      >
        기록하기
      </button>
    </div>
  );
}

export default StepComplete;
