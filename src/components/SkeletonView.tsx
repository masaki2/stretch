import React from 'react';

interface SkeletonViewProps {
  selectedId?: string | null;
  onSelect: (id: string) => void;
}

export function SkeletonView({ selectedId, onSelect }: SkeletonViewProps) {
  // A more detailed abstract representation of a skeleton joints.
  const parts = [
    { id: 'cervical', label: '頸椎', top: '12%', left: '50%' },
    { id: 'shoulder', label: '肩関節', top: '25%', left: '30%' },
    { id: 'shoulder_r', label: '肩関節', top: '25%', left: '70%', targetId: 'shoulder' },
    { id: 'thoracic', label: '胸椎', top: '38%', left: '50%', disabled: true },
    { id: 'lumbar', label: '腰椎', top: '50%', left: '50%', disabled: true },
    { id: 'pelvis', label: '股関節', top: '65%', left: '35%' },
    { id: 'pelvis_r', label: '股関節', top: '65%', left: '65%', targetId: 'pelvis' },
    { id: 'knee', label: '膝関節', top: '82%', left: '35%', disabled: true },
    { id: 'knee_r', label: '膝関節', top: '82%', left: '65%', disabled: true },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Abstract body lines */}
      <div className="absolute top-[10%] bottom-[30%] left-1/2 w-1.5 bg-slate-200 -translate-x-1/2 rounded-full"></div>
      <div className="absolute top-[25%] left-[30%] right-[30%] h-1.5 bg-slate-200 rounded-full"></div>
      <div className="absolute top-[65%] left-[35%] right-[35%] h-1.5 bg-slate-200 rounded-full"></div>
      <div className="absolute top-[65%] bottom-[15%] left-[35%] w-1.5 bg-slate-200 -translate-x-1/2 rounded-full"></div>
      <div className="absolute top-[65%] bottom-[15%] left-[65%] w-1.5 bg-slate-200 -translate-x-1/2 rounded-full"></div>

      {parts.map((part) => {
        const actualId = part.targetId || part.id;
        const isSelected = selectedId === actualId;
        const isDisabled = part.disabled;

        return (
          <button
            key={part.id}
            onClick={() => !isDisabled && onSelect(actualId)}
            disabled={isDisabled}
            title={isDisabled ? "現在準備中" : part.label}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full text-[11px] font-bold transition-all duration-300 shadow-sm flex items-center justify-center leading-tight
              ${isDisabled
                ? 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed z-0'
                : isSelected 
                  ? 'bg-teal-500 text-white shadow-teal-200 shadow-lg scale-110 z-20 border-2 border-white' 
                  : 'bg-white text-slate-700 hover:bg-teal-50 hover:text-teal-700 border-2 border-teal-100 hover:border-teal-300 hover:scale-110 cursor-pointer z-10'
              }`}
            style={{ top: part.top, left: part.left }}
          >
            {part.label}
          </button>
        );
      })}
    </div>
  );
}
