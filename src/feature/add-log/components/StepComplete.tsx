'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Lottie from 'lottie-react';
import { postMessageToWebView } from '@/utils/webview';
import ButtonLoadingIndicator from '@/common/components/ButtonLoadingIndicator';
import animationData from '@/assets/lottie/check.json';

function StepComplete() {
  const [loading, setLoading] = useState(false);
  const { getValues } = useFormContext();

  const handleSubmit = async () => {
    setLoading(true);

    const recordDataForm = {
      title: getValues('title'),
      is_public: getValues('is_public') ?? true,
      method: getValues('method'),
      option: getValues('option') || [],
      unit: getValues('unit') || '',
    };

    try {
      await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordDataForm),
      });

      postMessageToWebView({ route: '/' });
      setLoading(false);
    } catch (error) {
      console.error('저장 실패:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-48px)] flex-col justify-between bg-indigo-5 pt-2 px-6">
      <h1 className="mb-6 text-subtitle-1-b">
        이제 {getValues('title')}을(를)
        <br />
        기록할 수 있어요.
      </h1>
      <div className="flex justify-center items-center mb-20">
        <Lottie animationData={animationData} loop={false} autoplay={true} />
      </div>
      <button
        onClick={handleSubmit}
        className={
          'w-full flex justify-center items-center bg-indigo-700 text-indigo-5 py-[14px] text-body-1-b h-14 rounded-[8px]'
        }
        disabled={loading}
      >
        {loading ? <ButtonLoadingIndicator /> : '기록하기'}
      </button>
    </div>
  );
}

export default StepComplete;
