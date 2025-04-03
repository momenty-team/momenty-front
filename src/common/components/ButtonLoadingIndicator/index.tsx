import Dot from '@/assets/svg/dot.svg';
import './ButtonLoadingIndicator.css';

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
