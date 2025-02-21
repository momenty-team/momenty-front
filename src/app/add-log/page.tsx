'use client';

import useFunnel from '@/common/hooks/useFunnel';
import Method from '@/feature/add-log/components/StepMethod';
// import Create from './create';
import Complete from '@/feature/add-log/components/StepComplete';
import dynamic from 'next/dynamic';
import { postMessageToWebView } from '@/utils';
import TopNavigation from '@/common/components/TopNavigation';
import { suitFont } from '@/styles/font';

const Topic = dynamic(() => import('@/feature/add-log/components/StepTopic'), {
  ssr: false,
});

function AddLogFunnel() {
  const { Step, nextStep } = useFunnel<'기록주제' | '기록방식' | '기록생성' | '기록완료'>('기록주제');
  const routeBack = () => {
    postMessageToWebView({ route: 'goBack' });
  };

  return (
    <>
      <TopNavigation onClickBack={routeBack} backGroundColor="transparent" />
      <main className={`pt-12 ${suitFont.className}`}>
        <Step name="기록주제">
          <Topic onNext={() => nextStep('기록방식')} />
        </Step>

        <Step name="기록방식">
          <Method onNext={() => nextStep('기록완료')} />
        </Step>

        {/* <Step name="기록생성">
        <Create onNext={() => nextStep('기록완료')} onPrev={() => nextStep('기록방식')} />
      </Step> */}

        <Step name="기록완료">
          <Complete />
        </Step>
      </main>
    </>
  );
}

export default AddLogFunnel;
