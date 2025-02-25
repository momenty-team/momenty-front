'use client';

import dynamic from 'next/dynamic';

const LogDetail = dynamic(() => import('@/feature/log-detail/components'), {
  ssr: false,
});

function AddLogFunnel() {
  return <LogDetail />;
}

export default AddLogFunnel;
