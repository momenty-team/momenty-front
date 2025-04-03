import Dot from '@/assets/svg/dot.svg';
import './ButtonLoadingIndicator.css'; // 아래에 있는 CSS를 여기에 import

function ButtonLoadingIndicator() {
  return (
    <div className="flex gap-2">
      <div className="animate-pulse-dot delay-0">
        <Dot />
      </div>
      <div className="animate-pulse-dot delay-1">
        <Dot />
      </div>
      <div className="animate-pulse-dot delay-2">
        <Dot />
      </div>
    </div>
  );
}

export default ButtonLoadingIndicator;
