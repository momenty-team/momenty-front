import { useState } from 'react';

function useFunnel<T extends string>(initialStep: T) {
  const [step, setStep] = useState<T>(initialStep);

  const nextStep = (next: T) => setStep(next);

  const Step = ({ name, children }: { name: T; children: React.ReactNode }) => {
    return step === name ? <>{children}</> : null;
  };

  return { step, nextStep, Step };
}

export default useFunnel;
