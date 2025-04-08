'use client';

import React from 'react';
import Wheel from './Wheel';
import './styles.css';

interface TimePickerProps {
  initialHour?: number;
  initialMinute?: number;
  getHour: (hour: number) => void;
  getMinute: (minute: number) => void;
}

const TimePicker = ({ getHour, getMinute, initialHour, initialMinute }: TimePickerProps) => {
  return (
    <div
      style={{
        height: '240px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff',
      }}
    >
      <div style={{ width: 70, height: 180 }}>
        <Wheel initIdx={initialHour || 0} length={24} width={23} loop={true} label="시" onChange={getHour} />
      </div>
      <div style={{ width: 70, height: 180 }}>
        <Wheel initIdx={initialMinute || 0} length={60} width={23} loop={true} label="분" onChange={getMinute} />
      </div>
    </div>
  );
};

export default TimePicker;
