
import React from 'react';

const LoadingScreen = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 bg-gray-900 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent mx-auto"></div>
          <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-blue-400 opacity-20 mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4 animate-pulse">
          Loading your portfolio city...
        </h2>
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        <p className="text-gray-400 mt-4 text-sm">
          Preparing 3D experience / 3D 환경을 준비하고 있습니다
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
