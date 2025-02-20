'use client';

import useFunnel from '@/hooks/useFunnel';
import Topic from './page';
import Method from './method';
// import Create from './create';
import Complete from './complete';
import Unit from './unit';
import Option from './option';
import TopNavigation from '@/components/TopNavigation';
import { suitFont } from '@/styles/font';

function Layout() {
  const { Step, nextStep } = useFunnel<'기록주제' | '기록방식' | '옵션선택' | '단위선택' | '기록생성' | '기록완료'>(
    '기록주제'
  );

  const onClickNextBackButton = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ route: 'goBack' }));
    }
  };

  return (
    <>
      <TopNavigation onClickBack={onClickNextBackButton} backGroundColor="transparent" />
      <main className={`flex h-[calc(100vh-48px)] mt-12 ${suitFont.className}`}>
        <Step name="기록주제">
          <Topic onNext={() => nextStep('기록방식')} />
        </Step>

        <Step name="기록방식">
          <Method
            onNext={(selectedValue: string) => {
              if (selectedValue === '단위선택') {
                nextStep('단위선택');
              } else if (selectedValue === '옵션선택') {
                nextStep('옵션선택');
              } else {
                nextStep('기록완료');
              }
            }}
          />
        </Step>

        {/* <Step name="기록생성">
        <Create onNext={() => nextStep('기록완료')} onPrev={() => nextStep('기록방식')} />
      </Step> */}

        <Step name="옵션선택">
          <Option onNext={() => nextStep('기록완료')} />
        </Step>

        <Step name="단위선택">
          <Unit onNext={() => nextStep('기록완료')} />
        </Step>

        <Step name="기록완료">
          <Complete />
        </Step>
      </main>
    </>
  );
}

export default Layout;
