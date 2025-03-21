'use client';

import useFunnel from '@/common/hooks/useFunnel';
import Method from '@/feature/add-log/components/StepMethod';
import Option from '@/feature/add-log/components/StepOption';
import Unit from '@/feature/add-log/components/StepUnit';
import CustomUnit from '@/feature/add-log/components/StepCustomUnit';
import Complete from '@/feature/add-log/components/StepComplete';
import TopNavigation from '@/common/components/TopNavigation';
import dynamic from 'next/dynamic';
import { postMessageToWebView } from '@/utils/webview';
import { suitFont } from '@/styles/font';

// import Create from './create';

const Topic = dynamic(() => import('@/feature/add-log/components/StepTopic'), {
  ssr: false,
});

type Step = '기록주제' | '기록방식' | '기록생성' | '기록완료' | '옵션선택' | '단위선택' | '단위입력';

function AddLogFunnel() {
  const { Step, nextStep } = useFunnel<Step>('기록주제');

  const routeBack = () => {
    postMessageToWebView({ route: 'goBack' });
  };

  /* 
  <Step name="기록생성">
    <Create onNext={() => nextStep('기록완료')} onPrev={() => nextStep('기록방식')} />
  </Step>
  */

  return (
    <>
      <TopNavigation onClickBack={routeBack} backGroundColor="transparent" />
      <main className={`pt-12 h-full ${suitFont.className}`}>
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
      </main>
    </>
  );
}

export default AddLogFunnel;
