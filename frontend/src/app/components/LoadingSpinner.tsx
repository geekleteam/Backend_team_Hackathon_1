import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
