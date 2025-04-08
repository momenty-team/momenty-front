'use client';

import { postMessageToWebView } from '@/utils/webview';

interface LogSettingButtonProps {
  id: string;
}

function LogSettingButton({ id }: LogSettingButtonProps) {
  const goToLogSetting = () => {
    postMessageToWebView({ route: `/log-setting/${id}` });
  };

  return (
    <button className="absolute top-0 right-4 text-indigo-300 text-body-2-sb" onClick={goToLogSetting}>
      설정
    </button>
  );
}

export default LogSettingButton;
