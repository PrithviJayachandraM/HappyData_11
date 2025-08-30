
import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-10">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
  </div>
);
