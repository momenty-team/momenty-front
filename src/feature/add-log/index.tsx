'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Method from '@/feature/add-log/components/StepMethod';
import Option from '@/feature/add-log/components/StepOption';
import Unit from '@/feature/add-log/components/StepUnit';
import Topic from '@/feature/add-log/components/StepTopic';
import CustomUnit from '@/feature/add-log/components/StepCustomUnit';
import Complete from '@/feature/add-log/components/StepComplete';
import { postMessageToWebView } from '@/utils/webview';
import useAppMessage from '@/common/hooks/useAppMessage';
import useLockScroll from '@/common/hooks/useLockScroll';
import useStep from '@/common/hooks/useStep';
import type { Step } from '@/types';

function AddLog() {
  const { Step, nextStep, currentStep } = useStep<Step>('기록주제');
  const methods = useForm({
    defaultValues: {
      title: '',
      is_public: true,
      method: '',
      option: [],
      unit: '',
    },
  });

  useLockScroll(true);

  useAppMessage(({ history }) => {
    const navigateTarget = history?.step;

    if (navigateTarget) {
      nextStep(navigateTarget);
    }
  }, []);

  useEffect(() => {
    if (currentStep) {
      postMessageToWebView({ history: { step: currentStep } });
    }
  }, [currentStep]);

  return (
    <FormProvider {...methods}>
      <Step name="기록주제">
        <Topic onNext={() => nextStep('기록방식')} />
      </Step>

      <Step name="기록방식">
        <Method onNext={nextStep} />
      </Step>

      <Step name="옵션선택">
        <Option onNext={() => nextStep('기록완료')} />
      </Step>

      <Step name="단위선택">
        <Unit onNext={nextStep} />
      </Step>

      <Step name="단위입력">
        <CustomUnit onNext={() => nextStep('기록완료')} />
      </Step>

      <Step name="기록완료">
        <Complete />
      </Step>
    </FormProvider>
  );
}

export default AddLog;
