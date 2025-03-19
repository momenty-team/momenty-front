'use client';

import dynamic from 'next/dynamic';

const LogDetailD = dynamic(() => import('@/feature/log-detail/components'), {
  ssr: false,
});

function LogDetail() {
  return <LogDetailD />;
}

export default LogDetail;
