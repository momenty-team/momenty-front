'use client';

import useFunnel from '@/hooks/useFunnel';
import Topic from './topic';
import Method from './method';
// import Create from './create';
import Complete from './complete';

function AddLogFunnel() {
  const { Step, nextStep } = useFunnel<'기록주제' | '기록방식' | '기록생성' | '기록완료'>('기록주제');

  return (
    <main>
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
  );
}

export default AddLogFunnel;
