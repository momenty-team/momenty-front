'use client';

import dynamic from 'next/dynamic';

const LogDetailD = dynamic(() => import('@/feature/log-detail/components'), {
  ssr: false,
});

function LogDetail({ params }: { params: { id: string } }) {
  return <LogDetailD params={params} />;
}

export default LogDetail;
