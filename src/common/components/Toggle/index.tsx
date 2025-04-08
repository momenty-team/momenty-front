'use client';

import { useState, useEffect } from 'react';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

function Toggle({ checked = false, onChange, label }: ToggleProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-gray-800">{label}</span>}
      <button
        type="button"
        onClick={handleToggle}
        className={`relative rounded-full transition-colors duration-300
          ${isChecked ? 'bg-indigo-600' : 'bg-gray-300'}`}
        style={{ width: '51px', height: '26px' }}
      >
        <span
          className={`absolute top-[3px] left-[3px] bg-white rounded-full shadow-md transition-transform duration-300`}
          style={{
            width: '20px',
            height: '20px',
            transform: isChecked ? 'translateX(25px)' : 'translateX(0px)',
          }}
        />
      </button>
    </div>
  );
}

export default Toggle;
