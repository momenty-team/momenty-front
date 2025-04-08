'use client';

import useFunnel from '@/common/hooks/useFunnel';
import Method from '@/feature/add-log/components/StepMethod';
import Option from '@/feature/add-log/components/StepOption';
import Unit from '@/feature/add-log/components/StepUnit';
import CustomUnit from '@/feature/add-log/components/StepCustomUnit';
import Complete from '@/feature/add-log/components/StepComplete';
import dynamic from 'next/dynamic';
import { suitFont } from '@/styles/font';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { postMessageToWebView } from '@/utils/webview';
import useAppMessage from '@/common/hooks/useAppMessage';
import useLockScroll from '@/common/hooks/useLockScroll';

const Topic = dynamic(() => import('@/feature/add-log/components/StepTopic'), {
  ssr: false,
});

type Step = '기록주제' | '기록방식' | '기록생성' | '기록완료' | '옵션선택' | '단위선택' | '단위입력';

function AddLogFunnel() {
  const { Step, nextStep, currentStep } = useFunnel<Step>('기록주제');
  const methods = useForm({
    defaultValues: {
      title: '',
      is_public: true,
      method: '',
      option: [],
      unit: '',
    },
  });

  useAppMessage(({ history }) => {
    const navigateTarget = history?.funnel;

    if (navigateTarget) {
      nextStep(navigateTarget as Step);
    }
  }, []);

  useLockScroll(true);

  useEffect(() => {
    if (currentStep) {
      postMessageToWebView({ history: { funnel: currentStep } });
    }
  }, [currentStep]);

  return (
    <main className={`h-full ${suitFont.className}`}>
      <FormProvider {...methods}>
        <Step name="기록주제">
          <Topic onNext={() => nextStep('기록방식')} />
        </Step>

        <Step name="기록방식">
          <Method
            onNext={(selectedValue: string) => {
              if (selectedValue === '옵션선택') {
                nextStep('옵션선택');
              } else if (selectedValue === '단위선택') {
                nextStep('단위선택');
              } else {
                nextStep('기록완료');
              }
            }}
          />
        </Step>

        <Step name="옵션선택">
          <Option onNext={() => nextStep('기록완료')} />
        </Step>

        <Step name="단위선택">
          <Unit
            onNext={(selectedValue: string) => {
              if (selectedValue === '단위입력') {
                nextStep('단위입력');
              } else {
                nextStep('기록완료');
              }
            }}
          />
        </Step>

        <Step name="단위입력">
          <CustomUnit onNext={() => nextStep('기록완료')} />
        </Step>

        <Step name="기록완료">
          <Complete />
        </Step>
      </FormProvider>
    </main>
  );
}

export default AddLogFunnel;
