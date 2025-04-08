import { postMessageToWebView } from '@/utils/webview';
import OptionList from './OptionList';

import type { RecordDetail } from '@/types/apis/records';
import { useParams } from 'next/navigation';

interface OptionLogProps {
  logDetailList: RecordDetail[];
}

function OptionLog({ logDetailList }: OptionLogProps) {
  const { id: recordId } = useParams();

  const onClickLog = (id: number) => {
    postMessageToWebView({ route: `/log-setting/${recordId}/detail/${id}/option` });
  };
  return (
    <>
      {logDetailList.map(({ created_at, content, id }, index) => (
        <button key={index} onClick={() => onClickLog(id)} className="py-2 px-5 bg-indigo-5 flex flex-col">
          <div className="flex items-end w-full gap-3">
            <div className="text-display-2-el">{created_at.slice(11, 16)}</div>
            <OptionList options={content} />
          </div>
          <div className="text-display-4-r mb-1">레이블</div>
        </button>
      ))}
    </>
  );
}

export default OptionLog;
