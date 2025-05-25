export type BridgeRoute = string;

export interface CustomHealthValue {
  startDate: string;
  endDate: string;
  value: number | null;
  min?: number;
  max?: number;
}

export interface CustomHealthSleepValue {
  startDate: string;
  endDate: string;
  value: 'AWAKE' | 'REM' | 'CORE' | 'DEEP' | 'INBED';
}

type HapticType =
  | 'selection'
  | 'noticeSuccess'
  | 'noticeWarning'
  | 'noticeError'
  | 'ImpactLight'
  | 'ImpactMedium'
  | 'ImpactHeavy'
  | 'ImpactRigid'
  | 'ImpactSoft';

export interface BridgeData {
  route?: BridgeRoute;
  bottomSheet?: {
    name: string;
    state: 'open' | 'close' | 'hold';
    webviewRoute?: string;
    snapIndex?: number;
  };
  haptic?: HapticType;
  history?: {
    route?: string;
    funnel?: string;
  };
  viewState?: 'focus' | 'focusOut';
  toast?: {
    type: 'success' | 'error' | 'info';
    message: string;
  };
  date?: {
    year?: number;
    month?: number;
    day?: number;
  };
  externalLink?: {
    url: string;
  }
  healthKitData?: {
    activeEnergyBurned?: CustomHealthValue[];
    distanceWalkingRunning?: CustomHealthValue[];
    stepCount?: CustomHealthValue[];
    heartRateSamples?: CustomHealthValue[];
    heartRateVariabilitySamples?: CustomHealthValue[];
    restingHeartRateSamples?: CustomHealthValue[];
    sleepSamples?: CustomHealthSleepValue[];
    environmentalAudioExposure?: CustomHealthValue[];
    headphoneAudioExposure?: CustomHealthValue[];
  };
  healthKitSummaryData?: {
    activeEnergyBurned?: number;
    distanceWalkingRunning?: number;
    stepCount?: number;
    heartRateSamples?: number;
    heartRateVariabilitySamples?: number;
    restingHeartRateSamples?: number;
    sleepSamples?: string;
    environmentalAudioExposure?: number;
    headphoneAudioExposure?: number;
  };
}
