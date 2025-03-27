import { useState } from 'react';

function useFunnel<T extends string>(initialStep: T) {
  const [currentStep, setCurrentStep] = useState<T>(initialStep);

  const nextStep = (next: T) => setCurrentStep(next);

  const Step = ({ name, children }: { name: T; children: React.ReactNode }) => {
    return currentStep === name ? <>{children}</> : null;
  };

  return { currentStep, nextStep, Step };
}

export default useFunnel;
