import React, { useState, useEffect } from 'react';
import { BodyPartData, StretchStep } from '../data';
import { Dumbbell, Info, Ruler, Activity, Users, User } from 'lucide-react';

interface ContentPanelProps {
  data: BodyPartData;
}

type TabType = 'overview' | 'self' | 'partner';

export function ContentPanel({ data }: ContentPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Reset tab when selection changes
  useEffect(() => {
    setActiveTab('overview');
  }, [data.id]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full min-h-[600px]">
      
      {/* Header section */}
      <div className="bg-teal-600 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Activity size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 opacity-90 text-sm font-bold tracking-wider">
            <span className="bg-teal-500 px-3 py-1 rounded-full">{data.jointName}</span>
            <span className="text-teal-200">/</span>
            <span>ターゲット：{data.targetMuscles.join('・')}</span>
          </div>
          <h2 className="text-4xl font-black">{data.movement}</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/80 px-4 pt-4 gap-2 overflow-x-auto hide-scrollbar">
        <TabButton 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
          icon={<Info size={18} />}
          label="解剖学 & ROM"
        />
        <TabButton 
          active={activeTab === 'self'} 
          onClick={() => setActiveTab('self')}
          icon={<User size={18} />}
          label="セルフストレッチ"
        />
        <TabButton 
          active={activeTab === 'partner'} 
          onClick={() => setActiveTab('partner')}
          icon={<Users size={18} />}
          label="パートナーストレッチ"
        />
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 overflow-y-auto bg-white">
        {activeTab === 'overview' && <OverviewTab data={data} />}
        {activeTab === 'self' && <StretchStepsTab steps={data.selfStretch} type="self" />}
        {activeTab === 'partner' && <StretchStepsTab steps={data.partnerStretch} type="partner" />}
      </div>
    </div>
  );
}

function OverviewTab({ data }: { data: BodyPartData }) {
  return (
    <div className="space-y-10 animate-in fade-in">
      {/* Anatomy Point */}
      <section>
        <h3 className="text-xl font-black text-slate-800 border-b-2 border-teal-100 pb-3 mb-5 flex items-center gap-2">
          <Dumbbell className="text-teal-600" size={24} />
          解剖学的ポイントと筋膜連鎖
        </h3>
        <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 text-base">
          {data.anatomyPoint}
        </p>
      </section>

      {/* ROM Evaluation */}
      <section>
        <h3 className="text-xl font-black text-slate-800 border-b-2 border-teal-100 pb-3 mb-5 flex items-center gap-2">
          <Ruler className="text-teal-600" size={24} />
          ROM（関節可動域）と評価基準
        </h3>
        {data.rom.imageUrl && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-video max-w-lg">
            <img src={data.rom.imageUrl} alt="ROM Evaluation" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <div className="text-blue-800 font-bold mb-1 text-sm tracking-wide">参考可動域</div>
            <div className="text-4xl font-black text-blue-600 mb-4">{data.rom.normalAngle}</div>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">{data.rom.evaluation}</p>
          </div>
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
            <div className="text-rose-800 font-bold mb-3 text-sm flex items-center gap-1.5 tracking-wide">
              <Activity size={18} /> 代償動作の注意点
            </div>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">{data.rom.compensation}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function StretchStepsTab({ steps, type }: { steps: StretchStep[], type: 'self' | 'partner' }) {
  const isSelf = type === 'self';
  return (
    <div className="animate-in fade-in">
      <div className="mb-8 flex items-center gap-3">
        <div className={`p-3 rounded-2xl ${isSelf ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {isSelf ? <User size={28} /> : <Users size={28} />}
        </div>
        <h3 className="text-2xl font-black text-slate-800">
          {isSelf ? 'セルフストレッチ手順' : 'パートナーストレッチ手順'}
        </h3>
      </div>

      {/* 4-panel comic grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:border-teal-200 hover:shadow-md transition-all flex flex-col group">
            {/* Image Placeholder or Actual Image (The 1コマ) */}
            <div className={`aspect-video relative flex items-center justify-center border-b-2 border-slate-100 overflow-hidden ${isSelf ? 'bg-indigo-50/30' : 'bg-emerald-50/30'}`}>
              <div className="absolute top-4 left-4 bg-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg text-slate-800 shadow-sm z-10 border border-slate-100 group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              {step.imageUrl ? (
                <img src={step.imageUrl} alt={step.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="text-center opacity-50 flex flex-col items-center">
                  {isSelf ? <User size={48} className="mb-3 text-indigo-400" /> : <Users size={48} className="mb-3 text-emerald-400" />}
                  <span className="text-sm font-bold text-slate-600 bg-white/80 px-4 py-1.5 rounded-full shadow-sm">{step.imageAlt}</span>
                </div>
              )}
            </div>
            {/* Text Content */}
            <div className="p-6 flex-1 bg-white">
              <p className="text-slate-700 text-[15px] leading-loose font-medium">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-4 rounded-t-2xl font-bold text-sm transition-all -mb-px border-t-2 border-x-2 whitespace-nowrap
        ${active 
          ? 'bg-white text-teal-700 border-slate-100 z-10' 
          : 'bg-transparent text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100/50'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
