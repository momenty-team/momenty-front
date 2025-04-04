'use client';

import React from 'react';

interface CommonModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onDelete: () => void;
}

function CommonModal({ children, onClose, onDelete }: CommonModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0  z-10 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white rounded-[12px] p-5 w-[90%]">
        {children}
        <div className="flex w-[100%] gap-3 mt-[20px]">
          <button onClick={onClose} className="py-3 w-[100%] rounded-[8px] bg-indigo-25 text-indigo-400 text-body-1-b">
            취소
          </button>
          <button onClick={onDelete} className="py-3 w-[100%] rounded-[8px] bg-indigo-700 text-white text-body-1-b">
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommonModal;
