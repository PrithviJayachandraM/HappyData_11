
import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6">
    <h3 className="text-lg font-semibold text-cyan-400 mb-4">{title}</h3>
    <div className="w-full h-full">
        {children}
    </div>
  </div>
);
