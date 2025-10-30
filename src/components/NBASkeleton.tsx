import React from "react";

const NBASkeleton = () => {
  return (
    <>
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 mb-6 border border-gray-800 animate-pulse">
        {/* Date */}
        <div className="h-4 w-40 bg-gray-700 mx-auto mb-6 rounded"></div>

        {/* Teams */}
        <div className="flex justify-between items-center py-4">
          {/* Left Team */}
          <div className="flex flex-col items-center w-1/3">
            <div className="w-20 h-20 bg-gray-700 rounded-full mb-3"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>

          {/* Center Info */}
          <div className="flex flex-col items-center w-1/3">
            <div className="h-4 w-12 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-24 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-700 rounded"></div>
          </div>

          {/* Right Team */}
          <div className="flex flex-col items-center w-1/3">
            <div className="w-20 h-20 bg-gray-700 rounded-full mb-3"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NBASkeleton;
